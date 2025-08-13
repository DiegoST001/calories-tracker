import {  useState, type Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions, ActivityState } from "../reducers/activity-reducer";


type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialActivity : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form( {dispatch, state} : FormProps ){


    const [activity, setActivity] = useState<Activity>(initialActivity)

    useEffect(() => {
        if(state.activeId){
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
            
        }
        
    }, [state.activeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        
        const isNUmberField = ['category', 'calories'].includes(e.target.id);

        setActivity({
            ...activity,
            [e.target.id]: isNUmberField ? +e.target.value : e.target.value
        })

    }

    const isValidElement = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories  > 0
    }    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type:'save-activity', payload: {newAcivity: activity} });
        setActivity({
            ...initialActivity,
            id: uuidv4()
        });
    }
    return(
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg "
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categorias</label>
                <select 
                    name="" 
                    id="category" 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(item => 
                        <option 
                            key={item.id} 
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    )}
                </select>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad: </label>
                <input 
                    type="text" 
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de naranja, Ensaldad, Pesas"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

             <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias: </label>
                <input 
                    type="number" 
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            
            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-md disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar Ejercicio'}
                disabled={!isValidElement()}
            />
        </form>
    )
}