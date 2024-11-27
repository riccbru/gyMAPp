import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator"

const metricBia = {
    "basal_metabolic_rate": [`Il BMR è il dispendio energetico di un organismo a riposo. Comprende l'energia necessaria per le funzioni metaboliche vitali (respirazione, circolazione sanguigna, digestione, attività del sistema nervoso, ecc.).`, false],
    "total_daily_energy_expenditure": [`È il dispendio energetico giornaliero totale, calcolato come BMR + PAL (attività fisica muscolare), 
                                      assumendo come marginale il dispendio della termoregolazione e termogenesi.`, false],
    "phase_angle": [`Il PA esprime la proporzione tra gli spazi intra ed extra cellulari,
                    descrive proprietà sulla qualità della cellula e viene utilizzato in clinica come indice prognostico per le patologie croniche.
                    In un soggetto adulto sano il valore normale di angolo di fase è compreso tra valori di 5 e 7 gradi.`, true],
    "total_body_water": [`Rappresenta il principale componente del nostro organismo: è il compartimento che rappresenta i fluidi corporei totali presenti nel corpo.
                        È espressa come percentuale rispetto al peso corporeo; questo compartimento tende a diminuire con l'età, a causa della perdita fisiologica di FFM.`, true],
    "extra_cellular_water": [`L'ECW è composta dai fluidi all'esterno delle cellule. È localizzata principalmente nello spazio interstiziale fra le cellule,
                            all'interno dei vasi sanguigni, nei tessuti linfatici e nel liquido spinale.`, true],
    "intra_cellular_water": [`L'IBW viene calcolata come TBW - ECW. Rappresenta i fluidi ricchi di potassio all'interno delle cellule.
                            Il suo volume è compreso tra il 55-70% dell'acqua totale in funzione dello stato di nutrizione.`, true],
    "fat_free_mass": [`La FFM è il compartimento contenente tutto ciò che non è grasso corporeo: scheletro, 73% dei liquidi corporei, muscoli, pelle ed organi.
                     Una buona forma fisica presuppone un valore di FFM compresa tra il 77-85% rispetto al peso corporeo, in funzione dell'età.`, true],
    "fat_mass": [`La FM è un composto costituito dal glicerolo, una sostanza formata dagli acidi grassi, che è utilizzata come concentrato di energia per i muscoli.
                Una certa quantità di grasso è quindi necessaria sia come riserva energetica sia per il corretto svolgimento dei processi vitali.
                Un'altra piccola quantità, denominata grasso essenziale, ha una funzione di protezione degli organi interni, ma è importante che questo accumulo non oltrepassi i limiti fisiologici.
                Una buona forma fisica presuppone un valore di FM del 15-23% rispetto al
                peso corporeo dipendendo dell'età del soggetto.`, true],
    "body_composition_measurement": [`È la parte metabolicamente attiva dell'organismo che espleta tutto il lavoro funzionale,
                                    e il 'motore' del corpo in cui avvengono tutti i principali processi metabolici: dal consumo di ossigeno, l'ossidazione del glucosio, alla sintesi delle proteine.
                                    E la parte viva ed attiva dell'organismo, un compartimento di cui il corpo umano dovrebbe essere dotato in abbondanza.`, true],
    "muscle_mass": [`La MM totale rappresenta la stima della quantità degli oltre 650 muscoli presenti nel corpo umano.
                   La MM correla con la funzionalità fisica e con lo stato di salute del soggetto ed è coinvolta in molti processi
                   collegati alla fisiologia, nutrizione, trattamenti medici, prevenzione di malattie e riabilitazione a lungo termine.
                   Nel soggetto sano adulto, la MM rappresenta il 25-45% del peso in funzione del genere e dell'età.
                   Nel soggetto sportivo o atleta la quantità può arrivare al 50-70% del peso.
                   I soggetti anziani tendono a perdere fisiologicamente una porzione della massa muscolare, soprattutto negli arti inferiori.`, false],
    "skeletal_muscle_mass": [`La SMM rappresenta circa il 70% della MM. La SMM correla con la funzionalità fisica e con lo stato di salute del soggetto.`, true],
    "appendicular_skeletal_muscle_mass": [`La ASMM rappresenta il 75% della SMM ed è definita come la somma dei muscoli degli arti superiori ed inferiori.
                                         Una riduzione dell'ASMM porta a conseguenze negative sulla salute come debolezza, disabilità, un peggioramento della qualità della vita.`, true],
    "na_k": [`Il rapporto Na/K scambiabile, è un parametro calcolato indirettamente dalla BCM e ECM.
            Tuttavia, variazioni simultanee di questi due parametri non si traducono in variazioni individuabili,
            oltre che non essere informativo in determinati profili, come i soggetti obesi.
            La letteratura scientifica a supporto di questo parametro è datata e scarsa.
            Il Biavector e il PA, che derivano da dati bioelettrici puri, hanno sostituito nei decenni questo parametro,
            offrendo una valutazione più accurata dello stato di idratazione e l'integrità delle membrane cellulari.
            Per questa ragione, Akern non raccomanda l'uso di questo parametro nella valutazione della composizione corporea.`, true],
}

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
        append = "kg/m^2";
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

function BiaRow({ name, value, percentage }) {

    return (
        <Tooltip key={`tooltip-${name}`}>
            <TooltipTrigger asChild>
                <div className="flex flex-row justify-between w-full text-lg">
                    <div className="basis-1/4 items-center text-start font-bold ml-6">
                            {beautyName(name)}
                    </div>
                    <div className="basis-1/2 items-center text-center">
                        <div className="flex flex-row mx-auto">
                            <div>{value}</div>
                            <div className="ml-1 text-gray">{beautyMetrics(name)}</div>
                            {percentage ? <div className="mx-auto text-gray">({percentage} %)</div> : ''}
                        </div>
                    </div>
                
                    <div className="basis-5/6 mr-3">
                        {!metricBia[name]?.[1] ? null :
                            <img src={`/src/assets/bia/${name}.png`} className="w-70 h-11"/>}
                    </div>
                    
                </div>
            </TooltipTrigger>
            <TooltipContent side="left" className='tooltipContent text-start'>
                <div className="font-bold text-md text-pretty text-white dark:text-primary">{standardName(name)}</div>
                {name === "height" || name === "weight" || name === "body_mass_index" ? null : <Separator orientation={'horizontal'} className="bg-gray" />}
                <div className="text-start break-words max-w-xs">{metricBia[name]?.[0]}</div>
            </TooltipContent>

        </Tooltip>
    );
}

export { BiaRow };