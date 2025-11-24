import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { revalidatePath } from "next/cache";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2023-03-01",
});

export async function POST(request) {
  try {
    const { postId, action } = await request.json();

    if (!postId || !["like", "unlike"].includes(action)) {
      return NextResponse.json(
        { message: "Dados inválidos: postId ou action ausentes." },
        { status: 400 }
      );
    }

    const amount = action === "like" ? 1 : -1;

    const result = await writeClient
      .patch(postId)
      .setIfMissing({ totalLikes: 0 })
      .inc({ totalLikes: amount })
      .commit({ autoGenerateArrayKeys: true });

    revalidatePath("/blog");

    return NextResponse.json(
      { totalLikes: result.totalLikes, message: "Sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar likes:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor ao processar o like." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Método não permitido (Use POST)." },
    { status: 405 }
  );
}
