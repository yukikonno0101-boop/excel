
import React, { useState } from 'react';

interface ApiKeyInputProps {
    onSubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
    const [key, setKey] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key.trim()) {
            onSubmit(key.trim());
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-lg text-center">
                <h2 className="text-2xl font-bold text-green-400 mb-2">APIキーが必要です</h2>
                <p className="text-slate-400 mb-6 text-sm">
                    このアプリケーションを使用するには、Google AI APIキーが必要です。
                    <br />
                    キーはブラウザのセッションにのみ保存され、タブを閉じると削除されます。
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Google AI APIキーを貼り付け"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow duration-200 text-slate-200"
                        aria-label="API Key Input"
                    />
                    <button
                        type="submit"
                        disabled={!key.trim()}
                        className="w-full mt-4 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-slate-800 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        保存して開始
                    </button>
                </form>
                 <p className="text-xs text-slate-500 mt-4">
                    APIキーは <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-400 transition-colors">Google AI Studio</a> で取得できます。
                </p>
            </div>
        </div>
    );
};

export default ApiKeyInput;
