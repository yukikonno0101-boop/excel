
import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FormulaOutputProps {
    response: string;
    isLoading: boolean;
    error: string | null;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code.trim());
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="bg-slate-950 rounded-lg my-2 relative group">
            <pre className="p-4 text-green-300 text-sm font-mono overflow-x-auto">
                <code>{code.trim()}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-slate-700 rounded-md text-slate-300 hover:bg-slate-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200"
                aria-label="数式をコピー"
            >
                {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
            </button>
        </div>
    );
};

const FormattedResponse: React.FC<{ text: string }> = ({ text }) => {
    // Split the response by one or more empty lines for robust sectioning.
    const sections = text.split(/\n\s*\n+/).filter(section => section.trim());

    return (
        <div className="space-y-4">
            {sections.map((section, index) => {
                const trimmedSection = section.trim();
                const firstColonIndex = trimmedSection.indexOf(':');
                
                if (firstColonIndex === -1) {
                    // Handles the introductory text without a header
                    return <p key={index} className="whitespace-pre-wrap text-slate-200 text-base">{trimmedSection}</p>;
                }

                const title = trimmedSection.substring(0, firstColonIndex).trim();
                const content = trimmedSection.substring(firstColonIndex + 1).trim();
                const isFormula = title.startsWith('数式');

                if (isFormula) {
                    return (
                        <div key={index}>
                            <h3 className="text-base font-semibold text-slate-200">{title}</h3>
                            <CodeBlock code={content} />
                        </div>
                    );
                }

                return (
                    <div key={index}>
                         <h3 className="text-base font-semibold text-slate-200">{title}</h3>
                         <p className="whitespace-pre-wrap text-slate-300 mt-1 text-sm leading-relaxed">{content}</p>
                    </div>
                );
            })}
        </div>
    );
};


export const FormulaOutput: React.FC<FormulaOutputProps> = ({ response, isLoading, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <LoadingSpinner />
                    <p className="mt-4 text-slate-400">AIが考えています...</p>
                </div>
            );
        }
        if (error) {
            return (
                <div className="flex items-center justify-center h-full text-center">
                    <p className="text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>
                </div>
            );
        }
        if (response) {
            return <FormattedResponse text={response} />;
        }
        return (
            <div className="flex items-center justify-center h-full text-center">
                <p className="text-slate-500">生成された数式はここに表示されます。</p>
            </div>
        );
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg h-full min-h-[400px] lg:min-h-0">
          <div className="h-full overflow-y-auto pr-2">
            {renderContent()}
          </div>
        </div>
    );
};
