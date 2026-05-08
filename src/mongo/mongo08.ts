import type { Db } from "mongodb"

export class Article {
    title: string
    category: string
    published: boolean
    constructor(title: string, category: string, published: boolean) {
        this.title = title
        this.category = category
        this.published = published
    }
}

export async function count_published_articles(db: Db, category?: string): Promise<number> {
    // TODO: Посчитать количество опубликованных статей
    // Если передан category, считать только для этой категории
    return await db.collection("articles").countDocuments({ published: true, ...(category ? { category } : {}) })
}