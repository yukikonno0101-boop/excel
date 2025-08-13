
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface FormulaInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    onUseExample: () => void;
    disabled: boolean;
}

export const FormulaInput: React.FC<FormulaInputProps> = ({ value, onChange, onSubmit, onUseExample, disabled }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg h-full flex flex-col">
            <label htmlFor="prompt-input" className="block text-lg font-medium text-slate-300 mb-2">
                Excelでやりたいことを入力してください。
            </label>
            <p className="text-sm text-slate-400 mb-4">
                質問は日本語または英語で入力してください。できるだけ具体的に記述してください。
            </p>
            <textarea
                id="prompt-input"
                value={value}
                onChange={onChange}
                placeholder="A1に目標値、A2に実際の値が入っていて、A3に達成率を出したいとき、A3になんて入れればいい？"
                className="w-full flex-grow p-4 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow duration-200 text-slate-200 resize-none min-h-[200px]"
                rows={10}
                disabled={disabled}
            />
             <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button
                    onClick={onSubmit}
                    disabled={disabled || !value.trim()}
                    className="w-full sm:w-auto flex-grow inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-slate-900 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <MagicWandIcon className="w-5 h-5 mr-2" />
                    {disabled ? '生成中...' : '回答を生成'}
                </button>
                 <button
                    onClick={onUseExample}
                    disabled={disabled}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-slate-600 text-base font-medium rounded-md text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-900 disabled:opacity-50 transition-colors"
                >
                    例を試す
                </button>
            </div>
        </div>
    );
};
