import {
  generateStudyItems,
  GENERATION_MODE_LOCAL_AI,
  GENERATION_MODE_RULES,
} from "../pipelines/generateStudyItems";

describe("generateStudyItems (Phase 7A rules)", () => {
  test("output shape matches GeneratedStudyItemV1", () => {
    const items = generateStudyItems(["Entropy: a measure of disorder in a system."]);
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({
      id: expect.any(String),
      type: "flashcard",
      sourceChunk: expect.any(String),
      question: expect.any(String),
      answer: expect.any(String),
      difficulty: expect.stringMatching(/^simple|medium$/),
      tags: expect.any(Array),
    });
  });

  test("term: definition (colon)", () => {
    const [item] = generateStudyItems([
      "Mitochondria: organelle that produces most of the cell's ATP.",
    ]);
    expect(item.tags).toContain("term-definition");
    expect(item.question).toMatch(/Mitochondria/i);
    expect(item.answer).toMatch(/ATP/);
  });

  test("term — gloss (em dash)", () => {
    const [item] = generateStudyItems([
      "Osmosis — movement of water across a semipermeable membrane.",
    ]);
    expect(item.tags).toContain("term-definition");
    expect(item.question).toMatch(/Osmosis/i);
  });

  test("heading + body on separate lines", () => {
    const [item] = generateStudyItems([
      "Key idea\nThis is the longer explanation that elaborates the heading.",
    ]);
    expect(item.tags).toContain("heading-body");
    expect(item.question).toMatch(/Key idea/);
    expect(item.answer).toMatch(/explanation/);
  });

  test("leading bullet reuses definition pattern", () => {
    const [item] = generateStudyItems([
      "- Osmosis is the movement of water across a membrane.",
    ]);
    expect(item.tags).toEqual(expect.arrayContaining(["definition", "list-item"]));
    expect(item.question).toMatch(/Osmosis/i);
  });

  test("X vs Y comparison", () => {
    const [item] = generateStudyItems(["TCP vs UDP transport protocols differ in reliability."]);
    expect(item.tags).toContain("comparison");
    expect(item.question).toMatch(/TCP/i);
    expect(item.question).toMatch(/UDP/i);
  });

  test("whereas comparison", () => {
    const [item] = generateStudyItems([
      "Prokaryotes lack a nucleus, whereas eukaryotes have a membrane-bound nucleus.",
    ]);
    expect(item.tags).toContain("comparison");
  });

  test("numbered process line", () => {
    const [item] = generateStudyItems(["1. Mix the solution and incubate for ten minutes."]);
    expect(item.tags).toContain("process");
  });

  test("sequence language", () => {
    const [item] = generateStudyItems([
      "First open the valve, then purge the line, and finally record the pressure.",
    ]);
    expect(item.tags).toContain("sequence");
  });

  test("equation-style chunk", () => {
    const [item] = generateStudyItems(["E = mc^2 relates mass and energy."]);
    expect(item.tags).toContain("equation");
  });

  test("multi-sentence chunk", () => {
    const [item] = generateStudyItems([
      "Cells divide under tight control. Errors in division can lead to disease.",
    ]);
    expect(item.tags).toContain("multi-sentence");
    expect(item.question).toMatch(/Cells divide/);
    expect(item.answer).toMatch(/Errors/);
  });

  test("fallback when no rule fits", () => {
    const [item] = generateStudyItems(["fragmentary gibberish xyzqw"]);
    expect(item.tags).toContain("fallback");
    expect(item.question).toMatch(/key idea/i);
  });

  test("extended definition cues (known as)", () => {
    const [item] = generateStudyItems(["This structure is known as the sarcoplasmic reticulum."]);
    expect(item.tags).toContain("definition");
    expect(item.answer).toMatch(/sarcoplasmic reticulum/i);
  });

  test("local-ai mode is stubbed (empty items)", () => {
    expect(
      generateStudyItems(["Entropy: disorder"], { mode: GENERATION_MODE_LOCAL_AI })
    ).toEqual([]);
  });

  test("explicit rules mode matches default behavior", () => {
    const a = generateStudyItems(["TCP vs UDP in transport."]);
    const b = generateStudyItems(["TCP vs UDP in transport."], { mode: GENERATION_MODE_RULES });
    expect(a).toEqual(b);
  });
});
