"""Generate SQL to assign product categories from activos.csv."""

import csv
import sys
from collections import Counter
from pathlib import Path

CSV_PATH = Path(r"c:\Users\MikeDev\Desktop\activos.csv")
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "supabase" / "migrations" / "003_assign_product_categories.sql"

CATEGORIES = {
    1: "Tecnologia",
    2: "Hogar",
    3: "Deportes",
    4: "Juguetes",
    5: "Cuidado personal",
}

KEYWORDS = {
    1: [
        "audifon", "airpod", "bluetooth", "smartwatch", "reloj inteligente",
        "parlante", "altavoz", "bocina", "camara", "wifi", "power bank",
        "cargador", "usb", "tablet", "celular", "telefono", "intercomunicador",
        "walkie", "consola", "videojuego", "proyector", "teclado", "mouse",
        "drone", "smart watch", "soporte de celular", "soporte para celular",
    ],
    2: [
        "cocina", "licuadora", "waflera", "bascula", "balanza", "organizador",
        "estante", "zapatero", "dispensador", "humidificador", "bombillo", "led",
        "foco", "lampara", "manguera", "termo", "botella", "olla", "sarten",
        "cuchillo", "escurridor", "molde", "freidora", "horno", "microondas",
        "protector", "puerta", "extension", "multitoma", "regulador", "voltaje",
        "bano", "ducha", "servilletero", "prensa ajo", "batidor", "mezclador",
        "nivelador", "herramienta", "dados", "carpa", "camping", "reloj pared",
        "decorativ", "ambientador", "linterna", "solar", "carro organizador",
        "repisa", "ollas", "sartenes", "garrafon", "bomba agua", "aro de luz",
        "tripode",
    ],
    3: [
        "deportiv", "gym", "fitness", "ejercicio", "flexion", "bandas elastic",
        "resistencia", "morral", "bolso viaje", "push up", "ligas",
        "quemador de grasa", "deportivo impermeable",
    ],
    4: [
        "juguete", "infantil", "nino", "ninos", "peluche", "arte infantil",
        "crayon", "marcador", "plastilina", "masa escolar", "mesa carta",
        "juego mesa", "dardos", "blaster", "control remoto", "auto coche",
        "cactus", "cocina infantil", "lavaplatos", "donas sokany", "lanzador",
        "disparador", "blitz",
    ],
    5: [
        "cabello", "cepillo secador", "plancha alisadora", "rizador",
        "ondulador", "depilador", "vello", "afeitar", "barba", "trimmer",
        "facial", "skin care", "maquilla", "agua micelar", "retinol",
        "keratina", "masajeador", "migrana", "antifaz", "postura espalda",
        "mascota", "pelos de mascota", "mascost", "cera para depilacion",
        "alisador", "secador y rizador", "afeitar electrica",
    ],
}

PREFIX_FALLBACK = {
    "T": 1, "A": 1, "P": 1, "R": 1,
    "H": 2, "F": 2, "G": 2, "C": 2, "K": 2, "X": 2, "N": 2, "Y": 2,
    "S": 2, "Z": 2, "E": 2, "O": 2,
    "D": 3, "M": 3,
    "J": 4, "W": 4, "L": 4, "U": 4,
    "B": 5, "Q": 5,
}


def normalize(text: str) -> str:
    replacements = {"á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ñ": "n"}
    lowered = text.lower()
    for src, dst in replacements.items():
        lowered = lowered.replace(src, dst)
    return lowered


def classify(code: str, desc: str) -> int:
    normalized = normalize(desc)
    scores = {cat: 0 for cat in CATEGORIES}
    for cat, keywords in KEYWORDS.items():
        for keyword in keywords:
            if keyword in normalized:
                scores[cat] += 1

    best = max(scores, key=scores.get)
    if scores[best] > 0:
        return best

    prefix = code[0].upper()
    return PREFIX_FALLBACK.get(prefix, 2)


def main() -> None:
    csv_path = Path(sys.argv[1]) if len(sys.argv) > 1 else CSV_PATH

    with csv_path.open(encoding="latin-1") as handle:
        rows = list(csv.DictReader(handle, delimiter=";"))

    counts = Counter(classify(row["code"], row["desc"]) for row in rows)
    print("Distribution:", {CATEGORIES[k]: v for k, v in sorted(counts.items())})

    by_category: dict[int, list[str]] = {cat_id: [] for cat_id in CATEGORIES}
    for row in rows:
        code = row["code"].replace("'", "''")
        by_category[classify(row["code"], row["desc"])].append(code)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as handle:
        handle.write("-- Auto-generated category assignments from activos.csv\n\n")
        for cat_id, codes in by_category.items():
            for index in range(0, len(codes), 50):
                batch = codes[index : index + 50]
                quoted = ", ".join(f"'{code}'" for code in batch)
                handle.write(
                    f"UPDATE products SET category_id = {cat_id} "
                    f"WHERE code IN ({quoted});\n"
                )

    print(f"SQL written to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
