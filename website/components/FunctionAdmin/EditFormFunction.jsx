import { useState } from 'react'
import api from '../../utils/api'
import 'notyf/notyf.min.css'

const EditFormFunction = props => {
  const [inputsArray, setInputsArray] = useState(
    props.functionInfo.utilizationForm || []
  )

  const addInput = () => {
    const newInputsArray = [...inputsArray]
    newInputsArray.push({ name: '', label: '', placeholder: '', type: 'text' })
    setInputsArray(newInputsArray)
  }

  const addOption = event => {
    const newInputsArray = [...inputsArray]
    const index = event.target.id.split('-')[1]
    const inputObject = newInputsArray[index]
    inputObject.options.push({ name: '', value: '' })
    setInputsArray(newInputsArray)
  }

  const handleChangeOption = (inputIndex, optionIndex, event) => {
    const newInputsArray = [...inputsArray]
    const inputObject = newInputsArray[inputIndex]
    const optionObject = inputObject.options[optionIndex]
    optionObject[event.target.name] = event.target.value
    setInputsArray(newInputsArray)
  }

  const handleChangeInput = event => {
    const newInputsArray = [...inputsArray]
    const index = event.target.id.split('-')[1]
    const inputObject = newInputsArray[index]
    inputObject[event.target.name] = event.target.value
    if (event.target.value === 'select') {
      inputObject.options = []
    }
    setInputsArray(newInputsArray)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    let Notyf
    if (typeof window !== 'undefined') {
      Notyf = require('notyf')
    }
    const notyf = new Notyf.Notyf({
      duration: 5000
    })
    try {
      await api.put(
        `/admin/functions/form/${props.functionInfo.id}`,
        { form: inputsArray },
        { headers: { Authorization: props.user.token } }
      )
      notyf.success('Sauvegardé!')
    } catch (error) {
      notyf.error('Erreur!')
    }
  }

  const handleRemoveInput = event => {
    const newInputsArray = [...inputsArray]
    const index = event.target.id.split('-')[1]
    newInputsArray.splice(index, 1)
    setInputsArray(newInputsArray)
  }

  const handleRemoveOption = (inputIndex, optionIndex) => {
    const newInputsArray = [...inputsArray]
    const inputObject = newInputsArray[inputIndex]
    const optionsArray = inputObject.options
    optionsArray.splice(optionIndex, 1)
    setInputsArray(newInputsArray)
  }

  return (
    <div className='container-fluid'>
      <form onSubmit={handleSubmit}>
        {inputsArray.length > 0 && (
          <div className='form-group text-center'>
            <button type='submit' className='btn btn-dark'>
              Sauvegarder
            </button>
          </div>
        )}

        {inputsArray.map((input, index) => {
          return (
            <div key={index} className='form-group Admin__Input-group'>
              <div className='text-center'>
                <button
                  type='button'
                  onClick={handleRemoveInput}
                  id={`remove-${index}`}
                  className='btn btn-dark'
                >
                  Supprimer l'input
                </button>
              </div>

              <label className='form-label' htmlFor={`name-${index}`}>
                Nom de l'input :
              </label>
              <input
                value={input.name}
                onChange={handleChangeInput}
                type='text'
                name='name'
                id={`name-${index}`}
                className='form-control'
                placeholder='(e.g : cityName)'
              />
              <br />

              <label className='form-label' htmlFor={`label-${index}`}>
                Label :
              </label>
              <input
                value={input.label}
                onChange={handleChangeInput}
                type='text'
                name='label'
                id={`label-${index}`}
                className='form-control'
                placeholder="(e.g : Entrez le nom d'une ville :)"
              />
              <br />

              {input.type !== 'select' && (
                <>
                  <label
                    className='form-label'
                    htmlFor={`placeholder-${index}`}
                  >
                    Placeholder :
                  </label>
                  <input
                    value={input.placeholder}
                    onChange={handleChangeInput}
                    type='text'
                    name='placeholder'
                    id={`placeholder-${index}`}
                    className='form-control'
                    placeholder='(e.g : Paris, FR)'
                  />
                  <br />
                </>
              )}

              <label className='form-label' htmlFor={`type-${index}`}>
                Type :
              </label>
              <select
                value={input.type}
                onChange={handleChangeInput}
                name='type'
                id={`type-${index}`}
                className='form-control'
              >
                <option value='text'>text</option>
                <option value='integer'>Number integer</option>
                <option value='float'>Number float</option>
                <option value='calendar'>calendar</option>
                <option value='select'>select</option>
              </select>

              {input.type === 'select' && (
                <div style={{ marginTop: '50px' }}>
                  <label className='form-label'>Options :</label>

                  {input.options.map((option, optionIndex) => {
                    return (
                      <div
                        key={optionIndex}
                        style={{ margin: '0 0 30px 0' }}
                        className='form-group Admin__Input-group'
                      >
                        <div className='text-center'>
                          <button
                            type='button'
                            onClick={() =>
                              handleRemoveOption(index, optionIndex)}
                            className='btn btn-dark'
                          >
                            Supprimer l'option
                          </button>
                        </div>

                        <label
                          className='form-label'
                          htmlFor={`optionName-${optionIndex}-${index}`}
                        >
                          Nom de l'option
                        </label>
                        <input
                          onChange={event =>
                            handleChangeOption(index, optionIndex, event)}
                          value={option.name}
                          id={`optionName-${optionIndex}-${index}`}
                          name='name'
                          type='text'
                          className='form-control'
                          placeholder="Nom de l'option"
                        />

                        <br />
                        <label
                          className='form-label'
                          htmlFor={`optionValue-${optionIndex}-${index}`}
                        >
                          Valeur de l'option
                        </label>
                        <input
                          onChange={event =>
                            handleChangeOption(index, optionIndex, event)}
                          value={option.value}
                          id={`optionValue-${optionIndex}-${index}`}
                          name='value'
                          type='text'
                          className='form-control'
                          placeholder="Valeur de l'option"
                        />
                      </div>
                    )
                  })}

                  <div className='form-group text-center'>
                    <button
                      id={`optionAdd-${index}`}
                      onClick={addOption}
                      type='button'
                      className='btn btn-dark'
                    >
                      Ajouter une option
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </form>

      <div style={{ marginBottom: '30px' }} className='form-group text-center'>
        <button type='button' onClick={addInput} className='btn btn-dark'>
          Ajouter un input
        </button>
      </div>
    </div>
  )
}

export default EditFormFunction
