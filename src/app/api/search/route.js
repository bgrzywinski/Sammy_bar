import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicjalizacja klienta OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim() === '') {
      return NextResponse.json(
        { error: 'Zapytanie nie może być puste' },
        { status: 400 }
      );
    }

    // Przygotowanie zapytania do modelu - bardziej precyzyjny prompt bez formatu JSON
    const prompt = `
      Wyszukaj szczegółowe informacje o "${query}" (książce, filmie lub artykule) i przygotuj rozbudowane streszczenie oraz recenzję w języku polskim.

      Odpowiedź powinna być dobrze sformatowana i zawierać następujące sekcje:

      1. Tytuł: [pełny tytuł dzieła]
      2. Autor: [imię i nazwisko autora/twórcy]
      3. Rok: [rok wydania/premiery]
      4. Gatunek: [gatunek/kategoria]
      5. Wprowadzenie: [2-3 zdania opisujące ogólny charakter dzieła]
      6. Streszczenie: [szczegółowe streszczenie fabuły, minimum 300 słów]
      7. Analiza: [krytyczna analiza dzieła, jego mocne i słabe strony, minimum 200 słów]
      8. Ocena: [ocena w skali 1-10 z uzasadnieniem, oparta na recenzjach z internetu jeśli są dostępne]
      9. Dla kogo: [krótki opis docelowej grupy odbiorców]

      BARDZO WAŻNE: Każda sekcja musi zaczynać się od odpowiedniego nagłówka (np. "Tytuł:", "Autor:", itd.) w osobnej linii.
      Każda sekcja musi być oddzielona pustą linią od poprzedniej.
      Nie używaj formatu JSON ani żadnych znaczników technicznych.
      Jeśli nie możesz znaleźć konkretnych informacji, napisz "Brak danych" zamiast "Nie znaleziono".
    `;

    // Wywołanie API OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o-mini', // Używamy bardziej zaawansowanego modelu
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;

    // Przetwarzanie odpowiedzi tekstowej na strukturę
    const sections = {
      title: query, // Domyślnie używamy zapytania jako tytułu
      author: "Brak danych",
      year: "Brak danych",
      genre: "Brak danych",
      introduction: "Brak danych",
      summary: "Brak danych",
      analysis: "Brak danych",
      rating: "Brak danych",
      recommendation: "Brak danych"
    };

    // Lepszy parser odpowiedzi
    const lines = content.split('\n');
    let currentSection = null;
    let currentContent = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Sprawdzamy, czy linia zawiera nagłówek sekcji
      if (line.startsWith('Tytuł:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "title";
        currentContent = line.replace('Tytuł:', '').trim();
      }
      else if (line.startsWith('Autor:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "author";
        currentContent = line.replace('Autor:', '').trim();
      }
      else if (line.startsWith('Rok:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "year";
        currentContent = line.replace('Rok:', '').trim();
      }
      else if (line.startsWith('Gatunek:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "genre";
        currentContent = line.replace('Gatunek:', '').trim();
      }
      else if (line.startsWith('Wprowadzenie:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "introduction";
        currentContent = line.replace('Wprowadzenie:', '').trim();
      }
      else if (line.startsWith('Streszczenie:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "summary";
        currentContent = line.replace('Streszczenie:', '').trim();
      }
      else if (line.startsWith('Analiza:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "analysis";
        currentContent = line.replace('Analiza:', '').trim();
      }
      else if (line.startsWith('Ocena:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "rating";
        currentContent = line.replace('Ocena:', '').trim();
      }
      else if (line.startsWith('Dla kogo:')) {
        if (currentSection) {
          sections[currentSection] = currentContent.trim();
        }
        currentSection = "recommendation";
        currentContent = line.replace('Dla kogo:', '').trim();
      }
      else {
        // Jeśli to nie jest nagłówek, dodajemy linię do aktualnej sekcji
        if (currentSection) {
          if (line === '') {
            currentContent += '\n\n'; // Dodajemy podwójny enter dla pustych linii
          } else {
            if (currentContent) {
              currentContent += ' ' + line; // Dodajemy spację przed nową linią
            } else {
              currentContent = line;
            }
          }
        }
      }
    }

    // Zapisujemy ostatnią sekcję
    if (currentSection) {
      sections[currentSection] = currentContent.trim();
    }

    // Sprawdzamy, czy udało się sparsować tytuł, jeśli nie, używamy zapytania
    if (!sections.title || sections.title === "Brak danych") {
      sections.title = query;
    }

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wyszukiwania' },
      { status: 500 }
    );
  }
}
