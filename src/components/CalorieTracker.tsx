import { useMemo } from "react"
import type { Activity } from "../types"
import CaloriesDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities}: CalorieTrackerProps){
    //contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0),[activities])
    const caloriesDisminished = useMemo( () => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total , 0) , [activities] )
    const caloriesTotal = useMemo(() => caloriesConsumed-caloriesDisminished, [caloriesConsumed, caloriesDisminished])

    return(
        <>
            <h1 className="text-4xl font-black text-white text-center">Resumen de calorias</h1>
           <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriesDisplay
                    calories = {caloriesConsumed}
                    text = "Consumidas"
                />
                <CaloriesDisplay
                    calories = {caloriesDisminished}
                    text = "Quemadas"
                />
                <CaloriesDisplay
                    calories = {caloriesTotal}
                    text = "Diferencia"
                />
                
{/*                 
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center"> {caloriesDisminished }</p>
                <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">{ caloriesTotal }</p> */}
           </div>
        </>
    )
}