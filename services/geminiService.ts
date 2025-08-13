export async function generateExcelFormula(prompt: string): Promise<string> {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("API呼び出し中にエラーが発生しました:", error);
        // 呼び出し元で処理できるようにエラーを再スローします
        throw error;
    }
}