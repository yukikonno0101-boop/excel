import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FormulaInput } from './components/FormulaInput';
import { FormulaOutput } from './components/FormulaOutput';
import { generateExcelFormula } from './services/geminiService';

const App: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('');
    const [apiResponse, setApiResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const exampleQuery = "A1に目標値、A2に実際の値が入っていて、A3に達成率を出したいとき、A3になんて入れればいい？";

    const handleGenerateFormula = useCallback(async (query: string) => {
        if (!query.trim()) {
            setError("Excelで実現したいことを入力してください。");
            return;
        }
        setIsLoading(true);
        setError(null);
        setApiResponse('');

        try {
            const result = await generateExcelFormula(query);
            setApiResponse(result);
        } catch (e) {
            console.error(e);
            setError("数式の生成中にエラーが発生しました。しばらくしてからもう一度お試しください。");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSubmit = () => {
      handleGenerateFormula(userInput);
    };

    const handleExample = () => {
      setUserInput(exampleQuery);
      handleGenerateFormula(exampleQuery);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <FormulaInput
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onSubmit={handleSubmit}
                            onUseExample={handleExample}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="lg:h-full">
                        <FormulaOutput
                            response={apiResponse}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;