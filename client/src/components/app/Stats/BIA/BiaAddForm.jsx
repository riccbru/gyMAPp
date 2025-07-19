import API from "@/lib/API";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function BiaAddForm() {

    const defaultBia = {
        date: '',
        height: 0.0,
        weight: 0.0,
        body_mass_index: 0.0, 
        basal_metabolic_rate: 0.0,
        total_daily_energy_expenditure: 0.0,
        na_k: 0.0, 
        phase_angle: 0.0,
        total_body_water: 0.0,
        extra_cellular_water: 0.0,
        intra_cellular_water: 0.0, 
        fat_free_mass: 0.0,
        fat_mass: 0.0,
        body_composition_measurement: 0.0,
        muscle_mass: 0.0, 
        skeletal_muscle_mass: 0.0,
        appendicular_skeletal_muscle_mass: 0.0
    };
    const navigate = useNavigate();
    const [newBia, setNewBia] = useState(defaultBia);

    const handleChange = (e) => {
        setNewBia((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newBia);
        if (!newBia.date || newBia.date.trim() === "") {
            alert("Date cannot be empty");
            return;
        }
        try {
            await API.pushBIA(newBia);
        } catch (err) {
            console.log(err);
        } finally {
            navigate("/stats");
        }
    }

    return(
        <Card className='authnCard'>
            <CardContent>
                <form className="flex flex-col mt-2 w-80" onSubmit={handleSubmit}>
                    <Label className='mt-2 mb-1.5'>Date</Label>
                    <Input name='date' value={newBia.date} type='date' className='authnInput' onChange={handleChange}/>
                    
                    <Label className='mt-2 mb-1.5'>Height</Label>
                    <Input name='height' value={newBia.height} type='number' step='any' placeholder='Height (cm)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>Weight</Label>
                    <Input name='weight' value={newBia.weight} type='number' step='any' placeholder='Weight (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>BMI</Label>
                    <Input name='body_mass_index' value={newBia.body_mass_index} type='number' step='any' placeholder='Body Mass Index...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>BMR</Label>
                    <Input name='basal_metabolic_rate' value={newBia.basal_metabolic_rate} type='number' step='any' placeholder='Basal Metabolic Rate...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>TDEE</Label>
                    <Input name='total_daily_energy_expenditure' value={newBia.total_daily_energy_expenditure} type='number' step='any' placeholder='Total Daily Energy Expenditure...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>Na/K</Label>
                    <Input name='na_k' value={newBia.na_k} type='number' step='any' placeholder='Na/K...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>PA</Label>
                    <Input name='phase_angle' value={newBia.phase_angle} type='number' step='any' placeholder='Phase Angle (°)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>TBW</Label>
                    <Input name='total_body_water' value={newBia.total_body_water} type='number' step='any' placeholder='Total Body Water (L)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>ECW</Label>
                    <Input name='extra_cellular_water' value={newBia.extra_cellular_water} type='number' step='any' placeholder='Extra Cellular Water (L)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>ICW</Label>
                    <Input name='intra_cellular_water' value={newBia.intra_cellular_water} type='number' step='any' placeholder='Intra Cellular Water (L)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>FFM</Label>
                    <Input name='fat_free_mass' value={newBia.fat_free_mass} type='number' step='any' placeholder='Fat Free Mass (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>FM</Label>
                    <Input name='fat_mass' value={newBia.fat_mass} type='number' step='any' placeholder='Fat Mass (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>BCM</Label>
                    <Input name='body_composition_measurement' value={newBia.body_composition_measurement} type='number' step='any' placeholder='Body Composition Measurement (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>MM</Label>
                    <Input name='muscle_mass' value={newBia.muscle_mass} type='number' step='any' placeholder='Muscle Mass (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>SMM</Label>
                    <Input name='skeletal_muscle_mass' value={newBia.skeletal_muscle_mass} type='number' step='any' placeholder='Skeletal Muscle Mass (kg)...' className='authnInput' onChange={handleChange}/>

                    <Label className='mt-2 mb-1.5'>ASMM</Label>
                    <Input name='appendicular_skeletal_muscle_mass' value={newBia.appendicular_skeletal_muscle_mass} type='number' step='any' placeholder='Appendicular Skeletal Muscle Mass (kg)...' className='authnInput' onChange={handleChange}/>

                    <Button type="submit" className="mt-5 !bg-white text-background rounded-3xl hover:rounded-xl transition-all duration-200 ease-linear cursor-pointer">
                        ADD
                    </Button>

                </form>
                <CardFooter className="flex justify-center text-sm">
                    <Button className='mt-3 bg-red hover:bg-red rounded-xl' onClick={() => navigate("/stats")}>CANCEL</Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}

export { BiaAddForm };