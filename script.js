

class Calculator{
    
    constructor(previousOpperandTextElement, currentOpperandTextElement){
        this.previousOpperandTextElement = previousOpperandTextElement
        this.currentOpperandTextElement = currentOpperandTextElement
        this.clear()
    }

    clear(){
        this.currentOpperand = ''
        this.previousOpperand = ''
        this.opperation = undefined
    }

    delete(){
        this.currentOpperand = this.currentOpperand.toString().slice(0, -1);
         
    }

    appendNumber(number){
        if(number === '.' && this.currentOpperand.includes('.')) return
        this.currentOpperand = this.currentOpperand + number.toString();
    }

    chooseOpperation(opperation){
        if(this.currentOpperand === '') return
        if(this.previousOpperand !== ''){
            this.compute()
        }
        this.opperation = opperation
        this.previousOpperand = this.currentOpperand
        this.currentOpperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOpperand)
        const current = parseFloat(this.currentOpperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.opperation){
            case '+':
                computation = prev+current
            break
            case '-':
                computation = prev-current
            break
            case '*':
                computation = prev*current
            break
            case '÷':
                computation = prev/current
            break
            default:
                return
        }
        this.currentOpperand = computation
        this.operation = undefined
        this.previousOpperand = ''
    }

    updateDisplay(){
        this.currentOpperandTextElement.innerText = this.currentOpperand
        this.previousOpperandTextElement.innerText = this.previousOpperand
        
    }


}




const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-opperation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOpperandTextElement = document.querySelector('[data-previous-opperand]')
const currentOpperandTextElement = document.querySelector('[data-current-opperand]')

const calculator = new Calculator(previousOpperandTextElement, currentOpperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}) 

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpperation(button.innerText)
        calculator.updateDisplay()
    })
}) 

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})