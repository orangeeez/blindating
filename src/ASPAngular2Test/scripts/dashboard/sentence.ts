import {DashboardUtils} from './../utils/dashboard.utils'
import {dLocation} from './location'

export class dSentence {
    public static COUNTER: number;
    public DEFAULT_SYMBOL: number = 7.5;
    public SYMBOL_LENGTH: number = 9.3;
    public INITIAL_BLOCK_WIDTH: number = 7 * this.DEFAULT_SYMBOL;
    public INITIAL_TEXTAREA_WIDTH: number = 5 * this.DEFAULT_SYMBOL;
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
        block.style.top = (this.Location.y - 60) + 'px';
        block.style.left = (this.Location.x - 130) + 'px';
        block.style.position = 'absolute';
        block.style.width = this.INITIAL_BLOCK_WIDTH + 'px';
        return block;
    }

    private CreateTextareaElement = (): HTMLTextAreaElement => {
        let textarea = document.createElement('textarea');
        textarea.className = 'textarea';
        textarea.value = '\t';
        textarea.style.width = this.INITIAL_TEXTAREA_WIDTH + 'px';
        textarea.style.height = this.INITIAL_TEXTAREA_HEIGHT + 'px';
        return textarea;
    }

    private InputAutoResizing = (event: KeyboardEvent): void => {
        var widthBlock: number = DashboardUtils.RemovePx(this.Block.style.width);
        var heightTA: number = DashboardUtils.RemovePx(this.Textarea.style.height);
        var widthTA: number = DashboardUtils.RemovePx(this.Textarea.style.width);

        console.log(DashboardUtils.KeyCodes[event.keyCode]);
        if (this.Textarea.scrollHeight > heightTA)
            this.IncreaseTextareaHeight(heightTA);

        switch (DashboardUtils.KeyCodes[event.keyCode]) {
            case 'Enter':
                this.IncreaseTextareaHeight(heightTA);
                break;
            case 'Backspace':
                if (!this.IsFixed) {
                    this.Block.style.width = widthBlock - this.SYMBOL_LENGTH + 'px';
                    this.Textarea.style.width = widthTA - this.SYMBOL_LENGTH + 'px';
                }
                break;
            default:
                if (!this.IsFixed) {
                    this.Block.style.width = widthBlock + this.SYMBOL_LENGTH + 'px';
                    this.Textarea.style.width = widthTA + this.SYMBOL_LENGTH + 'px';
                }
                break;
        }
    }

    private IncreaseTextareaHeight = (heightTA: number): void => {
        this.IsFixed = true;
        this.Textarea.style.height = heightTA + this.INITIAL_TEXTAREA_HEIGHT + 'px';
    }
}
