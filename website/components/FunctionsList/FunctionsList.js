import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import FunctionCard from '../FunctionCard/FunctionCard'
import Loader from '../Loader'
import api from '../../utils/api'
import useAPI from '../../hooks/useAPI'
import './FunctionsList.css'

let pageFunctions = 1
const FunctionsList = (props) => {
  const { categoryId } = useRouter().query

  // State de recherche et de catégories
  const [, categories] = useAPI('/categories')
  const [inputSearch, setInputSearch] = useState({ search: '', selectedCategory: categoryId || '0' })

  // State pour afficher les fonctions
  const [functionsData, setFunctionsData] = useState({ hasMore: true, rows: [] })
  const [isLoadingFunctions, setLoadingFunctions] = useState(true)

  // Récupère la catégorie avec la query categoryId
  useEffect(() => {
    if (categoryId) {
      handleChange({ target: { name: 'selectedCategory', value: categoryId } })
    }
  }, [categoryId])

  // Récupère les fonctions si la catégorie/recherche change
  useEffect(() => {
    pageFunctions = 1
    getFunctionsData().then((data) => setFunctionsData(data))
  }, [inputSearch])

  // Permet la pagination au scroll
  const observer = useRef()
  const lastFunctionCardRef = useCallback((node) => {
    if (isLoadingFunctions) return
    if (observer.current) observer.current.disconnect()
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && functionsData.hasMore) {
        pageFunctions += 1
        getFunctionsData().then((data) => {
          setFunctionsData((oldData) => {
            return {
              hasMore: data.hasMore,
              rows: [...oldData.rows, ...data.rows]
            }
          })
        })
      }
    }, { threshold: 1 })
    if (node) observer.current.observe(node)
  }, [isLoadingFunctions, functionsData.hasMore])

  const getFunctionsData = async () => {
    setLoadingFunctions(true)
    const URL = `${(props.isAdmin) ? '/admin/functions' : '/functions'}?page=${pageFunctions}&limit=10&categoryId=${inputSearch.selectedCategory}&search=${inputSearch.search}`
    const { data } = await api.get(URL, {
      headers: {
        ...(props.isAdmin && props.token != null) && { Authorization: props.token }
      }
    })
    setLoadingFunctions(false)
    return data
  }

  const handleChange = (event) => {
    const inputSearchNew = { ...inputSearch }
    inputSearchNew[event.target.name] = event.target.value
    setInputSearch(inputSearchNew)
  }

  return (
    <div className='container text-center'>
      <div className='row justify-content-center'>
        {props.children}
      </div>

      <div className='Functions__search-container row justify-content-center'>
        <select name='selectedCategory' value={inputSearch.selectedCategory} onChange={handleChange} className='Functions__select Functions__form-control'>
          <option value='0'>Toutes catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} className='Functions__select-option' style={{ backgroundColor: category.color }}>{category.name}</option>
          ))}
        </select>
        <input value={inputSearch.search} onChange={handleChange} type='search' className='Functions__form-control Functions__search-input' name='search' id='search' placeholder='🔎 Rechercher...' />
      </div>

      <div className='row justify-content-center'>
        {functionsData.rows.map((currentFunction, index) => {
          // Si c'est le dernier élément
          if (functionsData.rows.length === index + 1) {
            return <FunctionCard isAdmin={props.isAdmin} key={currentFunction.id} ref={lastFunctionCardRef} {...currentFunction} />
          }
          return <FunctionCard isAdmin={props.isAdmin} key={currentFunction.id} {...currentFunction} />
        })}
      </div>
      {isLoadingFunctions && <Loader />}
    </div>
  )
}

export default FunctionsList
