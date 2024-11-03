import { useState, useEffect, Dispatch, SetStateAction } from 'react'

export const usePersistentState = (): [boolean, Dispatch<SetStateAction<boolean>>] => { 

  // read key from local storage if not found use default value
  const [value, setValue] = useState(() => {
    let currentValue : boolean

    try {
      // currentValue = JSON.parse(
      //   localStorage.getItem("persist")!)

        const valueJson = localStorage.getItem("persist")
        currentValue = valueJson !== null ? JSON.parse(valueJson) : false
    } catch (error) {
      currentValue = false
    }
    return currentValue
  });

  // update local storage when value changes
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(value));
    //console.log("persist", value)
  }, [value])

  return [value, setValue]
}


