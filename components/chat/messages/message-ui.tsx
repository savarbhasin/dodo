import { Fragment, useState } from "react";
import { Message, MessageContent } from "../../ai-elements/message";
import { Action, Actions } from "../../ai-elements/actions";
import { CopyIcon, RefreshCcwIcon, CheckIcon } from "lucide-react";
import { Response } from "../../ai-elements/response";
import { TextUIPart, UIMessage } from "ai";
import { toast } from "sonner";

interface MessageUIProps {
    message: UIMessage;
    i: number;
    messages: UIMessage[];
    regenerate: () => void;
    part: TextUIPart;
}

export function MessageUI({
    message,
    i,
    messages,
    regenerate,
    part
}: MessageUIProps) {
    const [isCopied, setIsCopied] = useState(false);
    
    return (
        <Fragment key={`${message.id}-${i}`}>
            <Message from={message.role}>
            <MessageContent>
                <Response>
                {part.text}
                </Response>
            </MessageContent>
            </Message>
            {message.role === 'assistant' && i === messages.length - 1 && (
            <Actions className="mt-2">
                <Action
                    onClick={() => regenerate()}
                    label="Retry"
                >
                    <RefreshCcwIcon className="size-3" />
                </Action>
                <Action
                    onClick={() => {
                        navigator.clipboard.writeText(part.text);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                    }}
                    label="Copy"
                >
                    {isCopied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                </Action>
            </Actions>
            )}
        </Fragment>
    )
}