let currentStep = 0;
const formSteps = document.querySelectorAll('.form-step')
const form = document.querySelector('form')


form.addEventListener('click', (e) => {
    if(!e.target.matches('[data-action]')) {
        return
    }

    const actions = {
        next() {
            if(!isValidInputs()) {
                return
            }    

            currentStep++

        },
        prev() {
            currentStep--
        }
    }

    const action = e.target.dataset.action 
    actions[action]()
    updateActiveStep()
    updateProgressStep()
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    

})

function updateActiveStep() {
    formSteps.forEach(step => step.classList.remove('active'))
    console.log(currentStep)
    formSteps[currentStep].classList.add('active')
}

const progressSteps = document.querySelectorAll('.step-progress [data-step]')
    function updateProgressStep() {
        progressSteps.forEach((step, idx) => {
            step.classList.remove('active')
            step.classList.remove('done')

            if(idx < currentStep + 1){
                step.classList.add('active')
            }

            if (idx < currentStep){
                step.classList.add('done')
            }

        })
        
    }

    function isValidInputs() {
        const currentFormStep = formSteps[currentStep]
        const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]

        return formFields.every((input) => input.reportValidity())
    }

    formSteps.forEach(formStep => {
        function addHide(){
            formStep.classList.add('hide')
        }

        formStep.addEventListener('animationend', () => {
            addHide()
            formSteps[currentStep].classList.remove('hide')
        })
    })
