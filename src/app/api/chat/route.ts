import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // 예상 답변이 포함된 FAQ 객체
    const faq: { [key: string]: string } = {
      배송: "일반 배송은 3~5일, 긴급 배송은 1~2일 소요됩니다.",
      환불: "상품 수령 후 7일 이내에 환불이 가능합니다.",
      고객센터: "고객센터 운영 시간은 평일 오전 9시부터 오후 6시까지입니다.",
    };

    // 사용자의 메시지를 소문자로 변환 후 비교
    const lowerMessage = message.toLowerCase();
    for (const key in faq) {
      if (lowerMessage.includes(key)) {
        return NextResponse.json({ reply: faq[key] });
      }
    }

    // ChatGPT API 호출
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `당신은 온라인 쇼핑몰 '스마트샵'의 고객 지원 챗봇입니다. 아래 정보를 기반으로 답변하세요:
            - 배송: 일반 배송 3~5일, 긴급 배송 1~2일
            - 환불: 상품 수령 후 7일 이내 가능
            - 고객센터 운영: 평일 09:00~18:00`,
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
