import { convertToFancyScores } from "../scoreName"


describe("convertToFancyScores function", () => {
    test("converts to fancy name", () => {
        expect(convertToFancyScores(["graphics", "sound", "gameplay", "level", "balance", "story", "performance", "original", "customization", "microtransactions", "support"]))
            .toEqual(["Graphics", "Sound Design", "Gameplay", "Level Design", "Balance", "Story/Narrative", "Performance", "Originality", "Customization", "Microtransactions", "Support"]);
    });

    test("handles empty input", () => {
        expect(convertToFancyScores([])).toEqual([]);
    });

    test("handles invalid input", () => {
        expect(convertToFancyScores(["invalidKey"])).toEqual([]);
    });

    test("handles mixed valid and invalid input", () => {
        expect(convertToFancyScores(["graphics", "invalidKey"])).toEqual(["Graphics"]);
    });

    test("handles mixed case input", () => {
        expect(convertToFancyScores(["GrApHiCs"])).toEqual(["Graphics"]);
    });
});