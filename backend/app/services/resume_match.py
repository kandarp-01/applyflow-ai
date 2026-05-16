MY_SKILLS = [

    "Python",
    "FastAPI",
    "React",
    "JavaScript",
    "SQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "HTML",
    "CSS",
    "JWT",
    "REST API",
    "SQLite"
]

MASTER_SKILLS = [

    "Python",
    "FastAPI",
    "React",
    "JavaScript",
    "SQL",
    "PostgreSQL",
    "Git",
    "GitHub",
    "HTML",
    "CSS",
    "JWT",
    "REST API",
    "SQLite",
    "Docker",
    "AWS",
    "Redis",
    "MongoDB",
    "Node.js",
    "Kubernetes",
    "TypeScript"
]

def calculate_match(job_description: str):

    jd_lower = job_description.lower()

    jd_skills = []

    for skill in MASTER_SKILLS:

        if skill.lower() in jd_lower:
            jd_skills.append(skill)

    matched = []

    missing = []

    for skill in jd_skills:

        if skill in MY_SKILLS:
            matched.append(skill)

        else:
            missing.append(skill)

    if len(jd_skills) == 0:

        match_percentage = 0

    else:

        match_percentage = int(
            (len(matched) / len(jd_skills)) * 100
        )

    return {

        "match_percentage": match_percentage,

        "matched_skills": matched,

        "missing_skills": missing
    }
