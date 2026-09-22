const express = require("express");

const router = express.Router();

const codingProblems = [
    {
        problem_number: "1",
        title: "Reverse a String",
        difficulty: "easy",
        language: "JavaScript",
        topic: "strings",
        description: "Write a program to reverse the given string without using a built-in reverse method.",
        points: 10,
        input_example: "Hello",
        output_example: "olleH"
    },
    {
        problem_number: "2",
        title: "Find Largest Number",
        difficulty: "easy",
        language: "Java",
        topic: "arrays",
        description: "Find the largest element from an array of integers.",
        points: 10,
        input_example: "10 25 7 42 18",
        output_example: "42"
    },
    {
        problem_number: "3",
        title: "Count Vowels",
        difficulty: "easy",
        language: "Python",
        topic: "strings",
        description: "Count the number of vowels present in a given string.",
        points: 15,
        input_example: "SkillBridge",
        output_example: "3"
    },
    {
        problem_number: "4",
        title: "Sum of Array Elements",
        difficulty: "easy",
        language: "C++",
        topic: "arrays",
        description: "Calculate the sum of all elements present in an integer array.",
        points: 10,
        input_example: "5 10 15 20",
        output_example: "50"
    },
    {
        problem_number: "5",
        title: "Palindrome Number",
        difficulty: "medium",
        language: "Java",
        topic: "loops",
        description: "Check whether the given number reads the same forward and backward.",
        points: 20,
        input_example: "121",
        output_example: "Palindrome"
    },
    {
        problem_number: "6",
        title: "Two Sum",
        difficulty: "medium",
        language: "JavaScript",
        topic: "arrays",
        description: "Find two numbers in an array whose sum equals the given target.",
        points: 25,
        input_example: "2, 7, 11, 15 | Target = 9",
        output_example: "Indexes 0 and 1"
    },
    {
        problem_number: "7",
        title: "Factorial Using Recursion",
        difficulty: "medium",
        language: "Python",
        topic: "functions",
        description: "Calculate factorial of a number using a recursive function.",
        points: 25,
        input_example: "5",
        output_example: "120"
    },
    {
        problem_number: "8",
        title: "Student Class",
        difficulty: "medium",
        language: "Java",
        topic: "OOP",
        description: "Create a Student class with properties and a method to display student information.",
        points: 30,
        input_example: "Name: Mohana, Age: 22",
        output_example: "Student information displayed"
    },
    {
        problem_number: "9",
        title: "Binary Search",
        difficulty: "hard",
        language: "C++",
        topic: "DSA",
        description: "Implement binary search to find a target element in a sorted array.",
        points: 40,
        input_example: "1 3 5 7 9 | Target = 7",
        output_example: "Index 3"
    },
    {
        problem_number: "10",
        title: "Second Largest Element",
        difficulty: "hard",
        language: "JavaScript",
        topic: "arrays",
        description: "Find the second largest distinct number from an array.",
        points: 40,
        input_example: "10 20 40 30 50",
        output_example: "40"
    }
];

router.get("/", (req, res) => {
    res.json({
        success: true,
        problems: codingProblems
    });
});

module.exports = router;