class CalcController {

    //Construtor da classe CalcController
    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonEvents();

    }

    /**
     * setInterval
     * É uma função para determinar um intervalo de tempo que um
     * evento irá acontecer, nesse caso o evento é o relógio da
     * calculadora ficar contando o tempo.
     * 
     * pega o currentDate(DataAtual).toLocaleDateString(que significa
     * transformar a data para o idioma local), e seta em displayDate
     * que faz parte do construtor do CalcController.
     * 
     * OBS: Os 1000 abaixo, determina o intervalo de tempo que o evento
     * irá acontecer. Os 1000 são em milisegundos.
     */

    initialize() {

        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }

    //Método para tratar múltiplos eventos do mouse
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });
    }

    //Método para Limpar tudo
    clearAll() {

        //setando o array operation para null, assim ficará vazio 
        this._operation = [];

    }

    //Método para limpar a última ação
    clearEntry() {

        //método pop é responsável por limpar o último índice do array
        this._operation.pop();

    }

    //Método para pegar a última alteração
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    //Método para trocar o operador
    isOperator(value) {

        /*indexOf é para verificar se o value é igual a algum item do array.
        Deve ser maior que -1, pois, quando o valor de value não é igual a algum item do array,
        o retorno é de -1 */
        return (['+', '-', '/', '*', '%'].indexOf(value) > -1);

    }

    //Método para substituir alguma determinada posição do array
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    //Método para verificar se
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        } else {

        }

    }

    calc() {

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

    }

    //Método para mostrar os números no display
    setLastNumberToDisplay() {

        let lastNumber;

        for (let i = this._operation.length; i >= 0; i--) {

            if (!this.isOperator(this._operation[i])) {

                lastNumber = this._operation[i];

                break;
            }

        }

        this.displayCalc = lastNumber;

    }

    //Método para adicionar operação
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            //quando for string
            if (this.isOperator(value)) {

                //trocar o operador
                this.setLastOperation(value);

            } else if (isNaN(value)) {

                //outra coisa
                console.log(newValue);

            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                //quando for número
                let newValue = this.getLastOperation().toString() + value.toString();
                //métoro push adiciona itens no final do array 
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }

        console.log(this._operation);

    }

    //Método para mostrar eventuais erros
    setError() {

        this.displayCalc = "Error";

    }

    //Método para definir as ações do clique
    execBtn(value) {

        switch (value) {

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':

                break;
            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }

    }



    //Método para adicionar eventos aos botões
    initButtonEvents() {

        //selecionando as classes dos botoes que os filhos forem g
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //para cada clique irá retornar a classe e o index
        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                //className.baseVal é para retornar no console
                //apenas o nome da classe
                //replace substitui o btn- e adiciona "" string vazia
                let textBtn = btn.className.baseVal.replace("btn-", "");

                //método para executar a ação do botão
                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer";

            });

        });

    }

    //Método para setar o display da calculadora
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            //Definindo o modo como irá aparecer a data na calculadora
            // 00:00:00 DIA de MÊS de ANO
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }


    //geters e seters
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }
}