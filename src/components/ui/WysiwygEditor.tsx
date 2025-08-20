import React, { useRef, useState, useEffect, useCallback } from 'react';

interface WysiwygEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const EditorButton: React.FC<{ onExecute: () => void, children: React.ReactNode, title: string }> = ({ onExecute, children, title }) => (
    <button
        type="button"
        onMouseDown={e => e.preventDefault()} // Prevent editor from losing focus
        onClick={onExecute}
        className="p-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        title={title}
    >
        {children}
    </button>
);

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isCodeView, setIsCodeView] = useState(false);
    const [currentBlock, setCurrentBlock] = useState('p');

    const handleCommand = (command: string, value: string | null = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        onChange(editorRef.current?.innerHTML || '');
    };
    
    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
        onChange(event.currentTarget.innerHTML);
    };

    const handleFormatBlock = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tag = e.target.value;
        handleCommand('formatBlock', `<${tag}>`);
        setCurrentBlock(tag);
    };

    const handleSelectionChange = useCallback(() => {
        if (document.activeElement === editorRef.current) {
            const block = document.queryCommandValue('formatBlock').toLowerCase();
            setCurrentBlock(block || 'p');
        }
    }, []);

    useEffect(() => {
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, [handleSelectionChange]);

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-[#1DB954] transition-shadow">
            <div className="flex items-center p-1 border-b border-gray-700 space-x-1 flex-wrap">
                <select 
                    value={currentBlock} 
                    onChange={handleFormatBlock}
                    onMouseDown={e => e.preventDefault()}
                    className="bg-gray-900 border-none text-gray-300 rounded-md p-2 hover:bg-gray-800 focus:outline-none"
                    title="Format Block"
                >
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                </select>
                <EditorButton title="Bold" onExecute={() => handleCommand('bold')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M12.5 4H6.5C5.12 4 4 5.12 4 6.5S5.12 9 6.5 9h3.5a1.5 1.5 0 010 3h-4a1.5 1.5 0 000 3h4.5c1.38 0 2.5-1.12 2.5-2.5S13.88 10 12.5 10H8.5a1.5 1.5 0 010-3h4c1.38 0 2.5-1.12 2.5-2.5S13.88 4 12.5 4z"/></svg>
                </EditorButton>
                <EditorButton title="Italic" onExecute={() => handleCommand('italic')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H14V4h-4z"/></svg>
                </EditorButton>
                <EditorButton title="Underline" onExecute={() => handleCommand('underline')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4v6c0 2.76 2.24 5 5 5s5-2.24 5-5V4h-2v6c0 1.65-1.35 3-3 3s-3-1.35-3-3V4H5zm-1 14h12v2H4v-2z"/></svg>
                </EditorButton>
                <EditorButton title="Unordered List" onExecute={() => handleCommand('insertUnorderedList')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4h12v2H4V4zm0 5h12v2H4V9zm0 5h12v2H4v-2z"/></svg>
                </EditorButton>
                <EditorButton title="Ordered List" onExecute={() => handleCommand('insertOrderedList')}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 4h2V3H2v1zm0 3h2V6H2v1zm0 3h2V9H2v1zm2 3v-1H2v1h2zm-2 2h2v-1H2v1zM6 4h12v2H6V4zm0 5h12v2H6V9zm0 5h12v2H6v-2z"/></svg>
                </EditorButton>
                 <EditorButton title="View Code" onExecute={() => setIsCodeView(!isCodeView)}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.293 13.707a1 1 0 010-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0zm7.414-1.414a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 010 1.414z"/></svg>
                </EditorButton>
            </div>
            {isCodeView ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full min-h-[120px] p-4 text-white outline-none bg-gray-900 font-mono text-sm resize-y"
                />
            ) : (
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onMouseUp={handleSelectionChange}
                    onKeyUp={handleSelectionChange}
                    dangerouslySetInnerHTML={{ __html: value }}
                    className="w-full min-h-[120px] p-4 text-white outline-none prose prose-invert prose-sm max-w-none"
                />
            )}
        </div>
    );
};

export default WysiwygEditor;