import React, { useCallback, useMemo, useState, useContext, useEffect, useRef } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
} from 'slate'
import { withHistory } from 'slate-history'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button, Toolbar } from './RteComponents'
import HolismIcon from '../../HolismIcon'
import { app, fieldStyles, FormContext } from '@Form'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const Rte = ({
    column,
    placeholder
}) => {
    const [currentValue, setCurrentValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ])
    const [id, setId] = useState();
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editorRef = useRef();
    if (!editorRef.current) {
        editorRef.current = withHistory(withReact(createEditor()))
    }
    const editor = editorRef.current;
    editor.children = currentValue
    var formContext = useContext(FormContext);
    const { progress, currentEntity, addFieldToFormContext, setField } = formContext;

    useEffect(() => {
        setId(`rte_${column}`);
    }, [column]);

    useEffect(() => {
        addFieldToFormContext(formContext, id, currentValue, false);
    }, [formContext, id]);

    useEffect(() => {
        if (currentEntity) {
            const value = currentEntity[app.camelize(column)]
            const json = JSON.parse(value);
            if (Array.isArray(json) && json.length > 0) {
                setCurrentValue(JSON.parse(value))
            }
        }
    }, [column, currentEntity])

    useEffect(() => {
        const json = JSON.stringify(currentValue)
        app.rteJson = json;
        setField(formContext, id, app.rteJson, true);
    }, [currentValue])

    return (
        <div className="mb-12 pb-12 border-b-2">
            <Slate editor={editor} value={currentValue} onChange={val => setCurrentValue(val)}>
                <Toolbar>
                    <MarkButton format="bold" icon={FormatBoldIcon} />
                    <MarkButton format="italic" icon={FormatItalicIcon} />
                    <MarkButton format="underline" icon={FormatUnderlinedIcon} />
                    <MarkButton format="code" icon={CodeIcon} />
                    <BlockButton format="heading-one" icon={LooksOneIcon} />
                    <BlockButton format="heading-two" icon={LooksTwoIcon} />
                    <BlockButton format="block-quote" icon={FormatQuoteIcon} />
                    <BlockButton format="numbered-list" icon={FormatListNumberedIcon} />
                    <BlockButton format="bulleted-list" icon={FormatListBulletedIcon} />
                </Toolbar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Write your content here ..."
                    spellCheck
                    className="prose"
                    autoFocus
                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                />
            </Slate>
        </div>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type),
        split: true,
    })
    const newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        })
    )

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <HolismIcon icon={icon} />
        </Button>
    )
}

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <HolismIcon icon={icon} />
        </Button>
    )
}

export { Rte }