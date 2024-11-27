'use strict';

const standardName = (entry) => {
    if (entry === "na_k") {
        return "Na/K";
    }
    return entry.split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
}

const beautyName = (entry) => {
    let append = "";
    if (!entry.includes("_")) {
        return entry.toUpperCase();
    }
    if (entry.length <= 3) {
        return entry.toUpperCase();
    }
    const result = entry.split("_")
                        .map((word) => word.charAt(0).toUpperCase())
                        .join("");
    return result;  
}

const beautyMetrics = (entry) => {
    let append = "";
    if (entry === "height") {
        append = "cm";
    } else if(entry === "phase_angle") {
        append = "°";
    } else if (entry === "body_mass_index") {
        append = "kg/m²";
    }
    else if(
        entry === "total_body_water" ||
        entry === "extra_cellular_water" ||
        entry === "intra_cellular_water"
    ) {
        append = "L";
    }
    else if (
        entry === "weight" || entry === "fat_free_mass" || entry === "fat_mass" ||
        entry === "body_composition_measurement" || entry === "muscle_mass" ||
        entry === "skeletal_muscle_mass" || entry === "appendicular_skeletal_muscle_mass"
    ) {
        append = "kg";
    } else if (entry === "basal_metabolic_rate" || entry === "total_daily_energy_expenditure") {
        append = "kcal";
    }
    return append;
}

const metricBia = {
    "basal_metabolic_rate": [`BMR is the energy expenditure of an organism at rest. It includes the energy required for vital metabolic functions (respiration, blood circulation, digestion, nervous system activity, and so on).`, false],
    "total_daily_energy_expenditure": [`This is the total daily energy expenditure, calculated as BMR + PAL (muscle physical activity), 
                                      assuming thermoregulation and thermogenesis expenditure as marginal.`, false],
    "phase_angle": [`PA expresses the proportion between intra- and extra-cellular spaces,
                    describes properties about cell quality and is used in the clinic as a prognostic index for chronic diseases.
                    In a healthy adult subject, the normal value of phase angle is between values of 5 and 7 degrees.`, true],
    "total_body_water": [`It represents the main component of our body: it is the compartment that represents the total body fluids in the body.
                        It is expressed as a percentage of body weight; this compartment tends to decrease with age, due to physiological loss of FFM.`, true],
    "extra_cellular_water": [`The ECW is composed of the fluids outside the cells. It is mainly located in the interstitial space between cells,
                            inside blood vessels, in lymphatic tissues and in spinal fluid.`, true],
    "intra_cellular_water": [`IBW is calculated as TBW - ECW. It represents the potassium-rich fluids within the cells.
                            Its volume is between 55-70% of total water depending on the state of nutrition.`, true],
    "fat_free_mass": [`FFM is the compartment containing everything that is not body fat: skeleton, around 73% of body fluids, muscles, skin and organs.
                     Good physical fitness assumes an FFM value between 77-85% of body weight, depending on age.`, true],
    "fat_mass": [`FM is a compound consisting of glycerol, a substance formed from fatty acids, which is used as an energy concentrate for muscles.
                A certain amount of fat is therefore necessary both as an energy reserve and for the proper performance of vital processes.
                Another small amount, called essential fat, has a protective function for internal organs, but it is important that this accumulation does not exceed physiological limits.
                Good physical fitness assumes a FM value of 15-23% of the
                body weight depending on the age of the subject.`, true],
    "body_composition_measurement": [`It is the metabolically active part of the body that performs all functional work,
                                    and the 'engine' of the body in which all major metabolic processes take place: from oxygen consumption, glucose oxidation, to protein synthesis.
                                    And the living and active part of the body, a compartment with which the human body should be endowed in abundance.`, true],
    "muscle_mass": [`MM represents the estimated amount of the more than 650 muscles in the human body.
                   MM correlates with a subject's physical function and health status and is involved in many processes
                   related to physiology, nutrition, medical treatments, disease prevention and long-term rehabilitation.
                   In the healthy adult subject, MM accounts for 25-45% of weight depending on gender and age.
                   In the sports or athletic subject, the amount can be as high as 50-70% of weight.
                   Elderly subjects tend to physiologically lose a portion of muscle mass, especially in the lower limbs.`, false],
    "skeletal_muscle_mass": [`SMM accounts for about 70% of MM. SMM correlates with physical function and health status of the subject.`, true],
    "appendicular_skeletal_muscle_mass": [`ASMM accounts for 75% of the SMM and is defined as the sum of the muscles of the upper and lower limbs.
                                         A reduction in ASMM leads to negative health consequences such as weakness, disability, a worsened quality of life.`, true],
    "na_k": [`The exchangeable Na/K ratio, is a parameter calculated indirectly from the BCM and ECM.
            However, simultaneous variations in these two parameters do not result in detectable changes,
            as well as not being informative in certain profiles, such as obese subjects.
            The scientific literature supporting this parameter is dated and scarce.
            The Biavector and PA, which are derived from pure bioelectrical data, have replaced this parameter over the decades,
            offering a more accurate assessment of hydration status and cell membrane integrity.
            For this reason, Akern does not recommend the use of this parameter in the assessment of body composition.`, true],
};

export default { metricBia, standardName, beautyName, beautyMetrics };