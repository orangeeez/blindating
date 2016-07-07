import {DashboardUtils} from './../utils/dashboard.utils'
import {dLocation} from './location'

export class dSentence {
    public static COUNTER: number;
    public SYMBOL_LENGTH: number = 7;
    public INITIAL_BLOCK_WIDTH: number = 50;
    public INITIAL_BLOCK_HEIGHT: number = 34;
    public INITIAL_TEXTAREA_WIDTH: number = 40;
    public INITIAL_TEXTAREA_HEIGHT: number = 24;

    public Dashboard: HTMLElement;
    public Identificator: number;
    public Location: dLocation;
    public Text: string;
    public Block: HTMLDivElement;
    public Textarea: HTMLTextAreaElement;
    private IsFixed: boolean = false;

    constructor(dashboard: HTMLElement, x: number, y: number) {
        this.Dashboard = dashboard;
        this.Identificator = dSentence.COUNTER++;
        this.Location = new dLocation(x, y);
        this.Block = this.CreateDivElement();
        this.Textarea = this.CreateTextareaElement();
        this.Block.appendChild(this.Textarea);
        this.Dashboard.appendChild(this.Block);
        this.Textarea.addEventListener('keydown', this.InputAutoResizing);
        this.Textarea.focus();
    }

    private CreateDivElement = (): HTMLDivElement => {
        let block = document.createElement('div');
        block.className = 'textbox';
        block.style.top = this.Location.y + 'px';
        block.style.left = this.Location.x + 'px';
        block.style.position = 'absolute';
        block.style.width = this.INITIAL_BLOCK_WIDTH + 'px';
        block.style.height = this.INITIAL_BLOCK_HEIGHT + 'px';
        return block;
    }

    private CreateTextareaElement = (): HTMLTextAreaElement => {
        let textarea = document.createElement('textarea');
        textarea.className = 'textarea';
        textarea.value = '   ';
        textarea.style.width = this.INITIAL_TEXTAREA_WIDTH + 'px';
        textarea.style.height = this.INITIAL_TEXTAREA_HEIGHT + 'px';
        return textarea;
    }

    private InputAutoResizing = (event: KeyboardEvent): void => {
        var widthBlock: number = DashboardUtils.RemovePx(this.Block.style.width);
        var heightBlock: number = DashboardUtils.RemovePx(this.Block.style.height);
        var heightTA: number = DashboardUtils.RemovePx(this.Textarea.style.height);
        var widthTA: number = DashboardUtils.RemovePx(this.Textarea.style.width);

        if (this.Textarea.scrollHeight > heightTA)
            this.IncreaseSentenceHeight(heightBlock, heightTA);

        switch (DashboardUtils.KeyCodes[event.keyCode]) {
            case 'Enter':
                this.IncreaseSentenceHeight(heightBlock, heightTA);
                break;
            case 'Backspace':
                this.DecreaseSentenceWidth(widthBlock, widthTA)
                break;
            default:
                this.IncreaseSentenceWidth(widthBlock, widthTA);
                break;
        }
    }

    private IncreaseSentenceWidth = (widthBlock: number, widthTA: number): void => {
        // Set width sentence boundary
        if (this.Location.x + widthBlock > this.Dashboard.clientWidth - this.SYMBOL_LENGTH) {
            this.Location.x -= this.SYMBOL_LENGTH;
            this.Block.style.left = this.Location.x + 'px';
        }

        if (!this.IsFixed) {
            this.Block.style.width = widthBlock + this.SYMBOL_LENGTH + 'px';
            this.Textarea.style.width = widthTA + this.SYMBOL_LENGTH + 'px';
        }
    }

    private DecreaseSentenceWidth = (widthBlock: number, widthTA: number): void => {
        if (!this.IsFixed) {
            this.Block.style.width = widthBlock - this.SYMBOL_LENGTH + 'px';
            this.Textarea.style.width = widthTA - this.SYMBOL_LENGTH + 'px';
        }
    }

    private IncreaseSentenceHeight = (heightBlock: number, heightTA: number): void => {
        // Set height sentence boundary
        if (this.Location.y + this.INITIAL_BLOCK_HEIGHT + heightTA >= this.Dashboard.clientHeight) {
            this.Location.y -= this.INITIAL_TEXTAREA_HEIGHT;
            this.Block.style.top = DashboardUtils.RemovePx(this.Block.style.top) - this.INITIAL_TEXTAREA_HEIGHT + 'px';
        }
        this.IsFixed = true;
        this.Block.style.height = heightBlock + this.INITIAL_TEXTAREA_HEIGHT + 'px';
        this.Textarea.style.height = heightTA + this.INITIAL_TEXTAREA_HEIGHT + 'px';
    }
}
