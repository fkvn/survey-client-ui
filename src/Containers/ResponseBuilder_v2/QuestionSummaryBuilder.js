import React from "react";
import QuestionResultSummary from "../../Components/Responses/QuestionResultSummary/QuestionResultSummary";

import * as funcs from "../../shared/utility";

function QuestionSummaryBuilder(props) {
  console.log("Question summary builder");

  const { survey = {} } = props;

  // single sections
  const surveyQuestionSummaries = {
    2: {
      4: {
        id: 1793,
        question: 4,
        totalResponses: 8,
        selectionResponses: {
          0: {
            id: 1989,
            groupBy: "mulChoiceSelection",
            groupedValue: "1",
            responses: [],
          },
          1: {
            id: 1990,
            groupBy: "mulChoiceSelection",
            groupedValue: "2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 1991,
            groupBy: "mulChoiceSelection",
            groupedValue: "3",
            responses: [
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          3: {
            id: 1992,
            groupBy: "mulChoiceSelection",
            groupedValue: "4",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
            ],
          },
        },
      },
      5: {
        id: 1798,
        question: 5,
        totalResponses: 8,
        selectionResponses: {
          0: {
            id: 1993,
            groupBy: "mulChoiceSelection",
            groupedValue: "no img 1",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          1: {
            id: 1994,
            groupBy: "mulChoiceSelection",
            groupedValue: "no img 2",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 1995,
            groupBy: "mulChoiceSelection",
            groupedValue: "no img 3",
            responses: [],
          },
        },
      },
      6: {
        id: 1802,
        question: 6,
        totalResponses: 8,
        selectionResponses: {
          0: {
            id: 1996,
            groupBy: "mulChoiceSelection",
            groupedValue: "1",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          1: {
            id: 1997,
            groupBy: "mulChoiceSelection",
            groupedValue: "2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 1998,
            groupBy: "mulChoiceSelection",
            groupedValue: "3",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
        },
      },
      7: {
        id: 1806,
        question: 7,
        totalResponses: 8,
        selectionResponses: {
          0: {
            id: 1999,
            groupBy: "mulChoiceSelection",
            groupedValue: "1",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
          1: {
            id: 2000,
            groupBy: "mulChoiceSelection",
            groupedValue: "2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 2001,
            groupBy: "mulChoiceSelection",
            groupedValue: "3",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
            ],
          },
        },
      },
      8: {
        id: 1810,
        question: 8,
        totalResponses: 8,
        selectionResponses: {
          0: {
            id: 2002,
            groupBy: "mulChoiceSelection",
            groupedValue: "1",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          1: {
            id: 2003,
            groupBy: "mulChoiceSelection",
            groupedValue: "2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 2004,
            groupBy: "mulChoiceSelection",
            groupedValue: "3",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          3: {
            id: 2005,
            groupBy: "mulChoiceSelection",
            groupedValue: "4",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
            ],
          },
        },
      },
      9: {
        id: 1815,
        question: 9,
        totalResponses: 8,
        rankingnResponses: {
          "1:0": {
            id: 2006,
            groupBy: "rankOption",
            groupedValue: "1:r1",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          "1:1": {
            id: 2007,
            groupBy: "rankOption",
            groupedValue: "1:r2",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
          "2:0": {
            id: 2008,
            groupBy: "rankOption",
            groupedValue: "2:r1",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "1:2": {
            id: 2009,
            groupBy: "rankOption",
            groupedValue: "1:r3",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "2:1": {
            id: 2010,
            groupBy: "rankOption",
            groupedValue: "2:r2",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "3:0": {
            id: 2011,
            groupBy: "rankOption",
            groupedValue: "3:r1",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "2:2": {
            id: 2012,
            groupBy: "rankOption",
            groupedValue: "2:r3",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          "3:1": {
            id: 2013,
            groupBy: "rankOption",
            groupedValue: "3:r2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "3:2": {
            id: 2014,
            groupBy: "rankOption",
            groupedValue: "3:r3",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
        },
      },
      10: {
        id: 1825,
        question: 10,
        totalResponses: 8,
        rankingnResponses: {
          "1:0": {
            id: 2015,
            groupBy: "rankOption",
            groupedValue: "1:r1",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "1:1": {
            id: 2016,
            groupBy: "rankOption",
            groupedValue: "1:r2",
            responses: [],
          },
          "2:0": {
            id: 2017,
            groupBy: "rankOption",
            groupedValue: "2:r1",
            responses: [
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "1:2": {
            id: 2018,
            groupBy: "rankOption",
            groupedValue: "1:r1",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "2:1": {
            id: 2019,
            groupBy: "rankOption",
            groupedValue: "2:r2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          "3:0": {
            id: 2020,
            groupBy: "rankOption",
            groupedValue: "3:r1",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
            ],
          },
          "1:3": {
            id: 2021,
            groupBy: "rankOption",
            groupedValue: "1:r3",
            responses: [],
          },
          "2:2": {
            id: 2022,
            groupBy: "rankOption",
            groupedValue: "2:r1",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
            ],
          },
          "3:1": {
            id: 2023,
            groupBy: "rankOption",
            groupedValue: "3:r2",
            responses: [
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
          "4:0": {
            id: 2024,
            groupBy: "rankOption",
            groupedValue: "4:r1",
            responses: [],
          },
          "1:4": {
            id: 2025,
            groupBy: "rankOption",
            groupedValue: "1:r2",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
            ],
          },
          "2:3": {
            id: 2026,
            groupBy: "rankOption",
            groupedValue: "2:r3",
            responses: [
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "3:2": {
            id: 2027,
            groupBy: "rankOption",
            groupedValue: "3:r1",
            responses: [
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "4:1": {
            id: 2028,
            groupBy: "rankOption",
            groupedValue: "4:r2",
            responses: [
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          "5:0": {
            id: 2029,
            groupBy: "rankOption",
            groupedValue: "5:r1",
            responses: [],
          },
          "2:4": {
            id: 2030,
            groupBy: "rankOption",
            groupedValue: "2:r2",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
            ],
          },
          "3:3": {
            id: 2031,
            groupBy: "rankOption",
            groupedValue: "3:r3",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
            ],
          },
          "4:2": {
            id: 2032,
            groupBy: "rankOption",
            groupedValue: "4:r1",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
            ],
          },
          "5:1": {
            id: 2033,
            groupBy: "rankOption",
            groupedValue: "5:r2",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "3:4": {
            id: 2034,
            groupBy: "rankOption",
            groupedValue: "3:r2",
            responses: [
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "4:3": {
            id: 2035,
            groupBy: "rankOption",
            groupedValue: "4:r3",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
          "5:2": {
            id: 2036,
            groupBy: "rankOption",
            groupedValue: "5:r1",
            responses: [],
          },
          "4:4": {
            id: 2037,
            groupBy: "rankOption",
            groupedValue: "4:r2",
            responses: [],
          },
          "5:3": {
            id: 2038,
            groupBy: "rankOption",
            groupedValue: "5:r3",
            responses: [
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          "5:4": {
            id: 2039,
            groupBy: "rankOption",
            groupedValue: "5:r2",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
        },
      },
      11: {
        id: 1851,
        question: 11,
        totalResponses: 8,
        ratingResponses: {
          1: {
            id: 2040,
            groupBy: "ratingOption",
            groupedValue: "1",
            responses: [
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
            ],
          },
          2: {
            id: 2041,
            groupBy: "ratingOption",
            groupedValue: "2",
            responses: [],
          },
          3: {
            id: 2042,
            groupBy: "ratingOption",
            groupedValue: "3",
            responses: [
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          4: {
            id: 2043,
            groupBy: "ratingOption",
            groupedValue: "4",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
            ],
          },
          5: {
            id: 2044,
            groupBy: "ratingOption",
            groupedValue: "5",
            responses: [
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
          6: {
            id: 2045,
            groupBy: "ratingOption",
            groupedValue: "6",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
            ],
          },
          7: {
            id: 2046,
            groupBy: "ratingOption",
            groupedValue: "7",
            responses: [
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
        },
      },
      12: {
        id: 1859,
        question: 12,
        totalResponses: 8,
        textResponses: {
          answered: {
            id: 2047,
            groupBy: "textOption",
            groupedValue: "answered",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
          skipped: {
            id: 2048,
            groupBy: "textOption",
            groupedValue: "skipped",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
            ],
          },
        },
      },
      13: {
        id: 1862,
        question: 13,
        totalResponses: 8,
        textResponses: {
          answered: {
            id: 2049,
            groupBy: "textOption",
            groupedValue: "answered",
            responses: [
              {
                id: 332,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:51:54",
                isDeleted: false,
              },
              {
                id: 344,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:52:47",
                isDeleted: false,
              },
              {
                id: 394,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:55:20",
                isDeleted: false,
              },
              {
                id: 406,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:10",
                isDeleted: false,
              },
            ],
          },
          skipped: {
            id: 2050,
            groupBy: "textOption",
            groupedValue: "skipped",
            responses: [
              {
                id: 268,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:23:04",
                isDeleted: false,
              },
              {
                id: 382,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:53:49",
                isDeleted: false,
              },
              {
                id: 418,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:57:43",
                isDeleted: false,
              },
              {
                id: 430,
                survey: 1,
                type: "ANONYMOUS",
                date: "2020-11-08 21:59:48",
                isDeleted: false,
              },
            ],
          },
        },
      },
    },
  };

  // multiple sections
  const surveyQuestionSummaries1 = {
    16: {
      22: {
        id: 2082,
        question: 22,
        totalResponses: 1,
        selectionResponses: {
          0: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          1: {
            responses: [],
          },
          2: {
            responses: [],
          },
        },
      },
      23: {
        id: 2086,
        question: 23,
        totalResponses: 1,
        ratingResponses: {
          1: {
            responses: [],
          },
          2: {
            responses: [],
          },
          3: {
            responses: [],
          },
          4: {
            responses: [],
          },
          5: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          6: {
            responses: [],
          },
          7: {
            responses: [],
          },
        },
      },
      24: {
        id: 2094,
        question: 24,
        totalResponses: 1,
        textResponses: {
          answered: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          skipped: {
            responses: [],
          },
        },
      },
    },
    17: {
      25: {
        id: 2097,
        question: 25,
        totalResponses: 1,
        rankingnResponses: {
          "1:0": {
            responses: [],
          },
          "1:1": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "2:0": {
            responses: [],
          },
          "1:2": {
            responses: [],
          },
          "2:1": {
            responses: [],
          },
          "3:0": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "1:3": {
            responses: [],
          },
          "2:2": {
            responses: [],
          },
          "3:1": {
            responses: [],
          },
          "4:0": {
            responses: [],
          },
          "1:4": {
            responses: [],
          },
          "2:3": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "3:2": {
            responses: [],
          },
          "4:1": {
            responses: [],
          },
          "5:0": {
            responses: [],
          },
          "2:4": {
            responses: [],
          },
          "3:3": {
            responses: [],
          },
          "4:2": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "5:1": {
            responses: [],
          },
          "3:4": {
            responses: [],
          },
          "4:3": {
            responses: [],
          },
          "5:2": {
            responses: [],
          },
          "4:4": {
            responses: [],
          },
          "5:3": {
            responses: [],
          },
          "5:4": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
        },
      },
      26: {
        id: 2123,
        question: 26,
        totalResponses: 1,
        textResponses: {
          answered: {
            responses: [],
          },
          skipped: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
        },
      },
    },
    15: {
      18: {
        id: 2063,
        question: 18,
        totalResponses: 1,
        selectionResponses: {
          0: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          1: {
            responses: [],
          },
          2: {
            responses: [],
          },
        },
      },
      19: {
        id: 2067,
        question: 19,
        totalResponses: 1,
        rankingnResponses: {
          "1:0": {
            responses: [],
          },
          "1:1": {
            responses: [],
          },
          "2:0": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "1:2": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "2:1": {
            responses: [],
          },
          "3:0": {
            responses: [],
          },
          "2:2": {
            responses: [],
          },
          "3:1": {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          "3:2": {
            responses: [],
          },
        },
      },
      21: {
        id: 2077,
        question: 21,
        totalResponses: 1,
        selectionResponses: {
          0: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          1: {
            responses: [
              {
                id: 2051,
                survey: 14,
                type: "ANONYMOUS",
                date: "2020-11-09 22:30:09",
                isDeleted: false,
              },
            ],
          },
          2: {
            responses: [],
          },
          3: {
            responses: [],
          },
        },
      },
    },
  };

  const MainDisplay = () => {
    return (
      <>
        <QuestionResultSummary
          survey={survey}
          surveyQuestionSummaries={surveyQuestionSummaries}
        />
      </>
    );
  };

  return <>{!funcs.isEmpty(survey) && <MainDisplay />} </>;
}

export default QuestionSummaryBuilder;
