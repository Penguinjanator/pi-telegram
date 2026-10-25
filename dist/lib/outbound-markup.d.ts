/**
 * Telegram outbound markup parsing helpers
 * Zones: telegram outbound, assistant markup
 * Owns delimiter-based assistant action comment extraction, attribute parsing, and markup stripping shared by voice and outbound delivery
 */
export interface TelegramHtmlComment {
    raw: string;
    content: string;
    start: number;
    end: number;
}
export declare function collectTelegramHtmlComments(markdown: string): {
    comments: TelegramHtmlComment[];
    openCommentStart?: number;
};
export declare function replaceTelegramButtonFences(markdown: string, replace: (payload: string, closed: boolean) => string): string;
export declare function replaceTelegramHtmlComments(markdown: string, replacer: (comment: TelegramHtmlComment) => string): string;
export declare function parseTelegramButtonPayloadRows(source: string): Record<string, unknown>[][] | undefined;
export declare function parseTelegramActionPayloadRows(comment: TelegramHtmlComment, command: string): Record<string, unknown>[][] | undefined;
export declare function stripTelegramCommentMarkupForPreview(markdown: string): string;
export declare function stripTelegramCommentMarkupForDelivery(markdown: string): string;
export interface TelegramVoiceReplyItem {
    text: string;
    lang?: string;
    rate?: string;
}
export interface TelegramVoiceReplyPlan {
    markdown: string;
    voiceText?: string;
    voiceReplies?: TelegramVoiceReplyItem[];
    lang?: string;
    rate?: string;
}
export declare function getTelegramActionString(payload: Record<string, unknown>, key: string): string | undefined;
export declare function planTelegramVoiceReply(markdown: string): TelegramVoiceReplyPlan;
