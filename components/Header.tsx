
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-400">
                Excelコンシェルジュ
            </h1>
            <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
                Excelでやりたいことを入力すると、最適な答えを生成します。
            </p>
        </header>
    );
};
