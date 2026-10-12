import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
      timeout: 60000,
        maxRetries: 2,
        });

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const spanish =
      typeof body.spanish === "string"
        ? body.spanish.trim()
        : "";

    if (!spanish) {
      return Response.json(
        {
          error: "Brak hiszpańskiego słowa lub wyrażenia.",
        },
        { status: 400 }
      );
    }

    if (spanish.length > 200) {
      return Response.json(
        {
          error: "Słowo lub wyrażenie jest zbyt długie.",
        },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      input: [
        {
          role: "system",
          content:
            "Jesteś asystentem do nauki języka hiszpańskiego dla polskiego studenta. " +
            "Użytkownik podaje tylko hiszpańskie słowo lub wyrażenie. " +
            "Przygotuj dokładne i praktyczne dane do nauki. " +
                        "Odpowiadaj po polsku, ale przykład zdania podaj po hiszpańsku " +
                                    "i dodaj jego polskie tłumaczenie. " +
                                                "Podaj przydatne synonimy i antonimy po hiszpańsku, " +
                                                            "ich polskie znaczenia oraz krótkie wyjaśnienia użycia po polsku. " +
                                                                        "Jeśli nie ma odpowiedniego synonimu lub antonimu, zwróć pustą tablicę, " +
                                                                                    "zamiast wymyślać nieprawdziwe odpowiedniki.",
                                                                                    
        },
        {
          role: "user",
          content:
            `Opracuj to hiszpańskie słowo lub wyrażenie:\n\n${spanish}`,
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "spanish_vocabulary",
          strict: true,

          schema: {
            type: "object",

            properties: {
              spanish: {
                type: "string",
              },

              polish: {
                type: "string",
              },

              part_of_speech: {
                type: "string",
              },

              gender: {
                type: ["string", "null"],
              },

              plural: {
                type: ["string", "null"],
              },

              is_reflexive: {
                type: "boolean",
              },

              reflexive_form: {
                type: ["string", "null"],
              },

              grammatical_info: {
                type: ["string", "null"],
              },

              spanish_example: {
                type: "string",
              },

              polish_example: {
                type: "string",
              },

              context: {
                type: ["string", "null"],
              },

              notes: {
                type: ["string", "null"],
              },
              synonyms: {
                  type: "array",
                    items: {
                        type: "object",
                            properties: {
                                  spanish: { type: "string" },
                                        polish: { type: "string" },
                                              explanation: { type: "string" },
                                                  },
                                                      required: ["spanish", "polish", "explanation"],
                                                          additionalProperties: false,
                                                            },
                                                            },
                                                            antonyms: {
                                                              type: "array",
                                                                items: {
                                                                    type: "object",
                                                                        properties: {
                                                                              spanish: { type: "string" },
                                                                                    polish: { type: "string" },
                                                                                          explanation: { type: "string" },
                                                                                              },
                                                                                                  required: ["spanish", "polish", "explanation"],
                                                                                                      additionalProperties: false,
                                                                                                        },
                                                                                                        },
                                                                                                      },


            required: [
              "spanish",
              "polish",
              "part_of_speech",
              "gender",
              "plural",
              "is_reflexive",
              "reflexive_form",
              "grammatical_info",
              "spanish_example",
              "polish_example",
              "context",
              "notes",
              "synonyms",
              "antonyms",
            ],

            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(response.output_text);

    return Response.json(result);
  } catch (error) {
    console.error("Vocabulary AI error:", error);

    return Response.json(
      {
        error: "Nie udało się przygotować słowa przez AI.",
      },
      { status: 500 }
    );
  }
}