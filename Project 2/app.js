/*jshint esversion: 6 */
(function () {
    'use strict';
    let cellNodes = [];

    document.addEventListener("DOMContentLoaded", function (event) {
        cellNodes = document.querySelectorAll(".inputSpace");
        let generateForm = document.getElementById("generateForm");
        let boardForm = document.getElementById("boardForm");
        let result = document.getElementById("resultMsg");

        generateForm.addEventListener("submit", function (event) {
            event.preventDefault();
            resetAllFeedback();
            let diff = document.getElementById("difficultySelector").value;
            loadSudoku("https://veff213-sudoku.herokuapp.com/api/v1/sudoku", diff, fillSudoku);
        });

        boardForm.addEventListener("submit", function (event) {
            event.preventDefault();
            resetAllFeedback();
            setTimeout(resetCellFeedback, 5000);
            if (checkSudoku()) {
                result.textContent = "You did it!";
                result.setAttribute("style", "display: block");
            }
        });
    });

    function fallback(difficulty) {
        const defaultBoards = {
            "easy": {
                "board": {
                    "boxes": [
                        ["5", "6", "4", ".", ".", "3", "2", ".", "1"],
                        ["8", "7", "2", ".", "1", ".", "3", "9", "."],
                        ["3", "9", "1", ".", ".", ".", ".", ".", "5"],
                        ["4", "2", "9", "6", "5", "7", "3", "1", "8"],
                        [".", ".", "8", "2", "3", "1", "9", "4", "7"],
                        ["7", "1", "3", "8", "4", "9", "5", "2", "6"],
                        [".", ".", "6", ".", "3", "5", "8", "4", "2"],
                        ["4", "2", "3", "7", "8", "9", "1", ".", "."],
                        [".", "5", "8", "2", "6", "4", "9", "3", "7"]
                    ],
                    "_id": -1
                }
            },
            "medium": {
                "board": {
                    "boxes": [
                        ["8", "7", ".", ".", "4", ".", "6", "2", "5"],
                        ["4", "5", ".", ".", "2", ".", ".", "1", "."],
                        ["2", "1", ".", "8", "5", ".", ".", "9", "."],
                        ["7", "6", ".", "5", ".", "4", ".", "8", "."],
                        ["9", "3", "1", "8", "6", "2", "5", ".", "7"],
                        ["5", "4", "8", "3", ".", "1", "9", "6", "2"],
                        ["2", ".", "7", "9", "5", "8", "4", ".", "6"],
                        [".", "9", "4", "6", "7", "3", "2", ".", "5"],
                        [".", ".", "5", "1", ".", "4", ".", ".", "."]
                    ],
                    "_id": -1
                }
            },
            "hard": {
                "board": {
                    "boxes": [
                        ["4", ".", ".", "9", ".", ".", ".", ".", "."],
                        [".", ".", ".", ".", "4", ".", ".", ".", "."],
                        ["5", "3", "9", "6", ".", "1", "7", ".", "4"],
                        [".", "9", "6", ".", "4", "7", ".", ".", "."],
                        [".", "7", "8", "5", ".", "2", "1", "9", "6"],
                        ["2", "5", "3", "9", "1", "6", "8", "4", "7"],
                        [".", ".", "1", ".", "8", "4", "2", ".", "."],
                        [".", "8", ".", ".", ".", ".", ".", "5", "4"],
                        ["4", ".", "2", "3", ".", "5", "1", "7", "8"]
                    ],
                    "_id": -1
                }
            }
        };
        return defaultBoards[difficulty] || defaultBoards.easy;
    }

    function loadSudoku(url, diff, callback) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({ difficulty: diff, }),
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then(
            function (response) {
                if (response.status !== 200 && response.status !== 201) {
                    return fallback(diff);
                }
                return response.json();
            }
        ).catch(
            () => fallback(diff) //get fallback board
        ).then(
            (obj) => callback(obj)
        );
    }

    function fillSudoku(obj) {
        let boxes = obj.board.boxes;
        for (let box_index = 0; box_index < boxes.length; box_index++) {
            const box = boxes[box_index];
            for (let space_index = 0; space_index < box.length; space_index++) {
                fillSpace(box_index, space_index, box[space_index]);
            }
        }
        let id = obj.board._id;
        document.getElementById("sudokuId").textContent = id;
    }

    function fillSpace(box_index, space_index, space) {
        let cellID = "cell" + box_index + space_index;
        let cell = document.getElementById(cellID);
        if (space !== ".") {
            cell.value = space;
            cell.setAttribute("disabled", "");
        }
        else {
            cell.value = "";
            cell.removeAttribute("disabled");
        }
    }

    function checkSudoku() {
        let legal = true;
        cellNodes.forEach((cell_a, index_a) => {
            legal &= checkCell(cell_a);
            for (let index_b = index_a + 1; index_b < cellNodes.length; index_b++) {
                const cell_b = cellNodes[index_b];
                if (checkRelation(cell_a, cell_b, index_a, index_b)) {
                    cell_a.classList.add("violatingCell");
                    cell_b.classList.add("violatingCell");
                    legal = false;
                }
            }
        });
        return legal;
    }

    function checkCell(cell) {
        if (cell.value === "") {
            cell.classList.add("emptyCell");
            return false;
        }
        let num = Number(cell.value);
        if (isNaN(num) || num < 1 || num > 9) {
            cell.classList.add("violatingCell");
            return false;
        }
        return true;
    }

    function checkRelation(cell_a, cell_b, index_a, index_b) {
        if (Number(cell_a.value) != Number(cell_b.value)) {
            return false;
        }
        if (cell_a.getAttribute("id").substring(0, 5) == cell_b.getAttribute("id").substring(0, 5)) {
            return true; //boxes
        }
        if (cell_a.parentNode == cell_b.parentNode) {
            return true; //rows
        }
        return (index_a % 9 == index_b % 9); //columns
    }

    function resetAllFeedback() {
        resetCellFeedback();
        resetResultFeedback();
    }

    function resetCellFeedback() {
        cellNodes.forEach(cell => {
            cell.classList.remove("emptyCell", "violatingCell");
        });
    }

    function resetResultFeedback() {
        let result = document.getElementById("resultMsg");
        result.textContent = "";
        result.removeAttribute("style");
    }
})();