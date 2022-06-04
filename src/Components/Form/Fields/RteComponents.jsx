import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

export const Button = React.forwardRef(
    (
        {
            className,
            active,
            reversed,
            ...props
        },
        ref
    ) => (
        <span
            {...props}
            ref={ref}
            className={"cursor-pointer mr-5 " + (reversed ? (active ? "text-white" : "text-gray-400") : (active ? "text-zinc-900" : "text-gray-300"))}
        />
    )
)

export const EditorValue = React.forwardRef(
    (
        {
            className,
            value,
            ...props
        },
        ref
    ) => {
        const textLines = value.document.nodes
            .map(node => node.text)
            .toArray()
            .join('\n')
        return (
            <div
                ref={ref}
                {...props}
                className="mt-[30px] -mb-[20px]"
            // className={cx(
            //   className,
            //   css`
            //     margin: 30px -20px 0;
            //   `
            // )}
            >
                <div
                //   className={css`
                //     font-size: 14px;
                //     padding: 5px 20px;
                //     color: #404040;
                //     border-top: 2px solid #eeeeee;
                //     background: #f8f8f8;
                //   `}
                >
                    Slate's value as text
                </div>
                <div
                //   className={css`
                //     color: #404040;
                //     font: 12px monospace;
                //     white-space: pre-wrap;
                //     padding: 10px 20px;
                //     div {
                //       margin: 0 0 0.5em;
                //     }
                //   `}
                >
                    {textLines}
                </div>
            </div>
        )
    }
)

export const Instruction = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <div
            {...props}
            ref={ref}
        //   className={cx(
        //     className,
        //     css`
        //       white-space: pre-wrap;
        //       margin: 0 -20px 10px;
        //       padding: 10px 20px;
        //       font-size: 14px;
        //       background: #f8f8e8;
        //     `
        //   )}
        />
    )
)

export const Menu = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <div
            {...props}
            ref={ref}
            className={className}
        //   className={cx(
        //     className,
        //     css`
        //       & > * {
        //         display: inline-block;
        //       }

        //       & > * + * {
        //         margin-left: 15px;
        //       }
        //     `
        //   )}
        />
    )
)

export const Portal = ({ children }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const Toolbar = React.forwardRef(
    (
        { className, ...props },
        ref
    ) => (
        <Menu
            {...props}
            ref={ref}
            className="relative pt-px pb-[17px] py-[18px] my-0 -mx-[20px] border-b-2 mb-[20px]"
        //   className={cx(
        //     className,
        //     css`
        //       position: relative;
        //       padding: 1px 18px 17px;
        //       margin: 0 -20px;
        //       border-bottom: 2px solid #eee;
        //       margin-bottom: 20px;
        //     `
        //   )}
        />
    )
)