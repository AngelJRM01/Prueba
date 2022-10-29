const Tourists = require("../data/tourists.json");

// Retrieve all tourists
exports.findAll = (req, res) => {

    res.json(Tourists);
    
}

exports.findByComunidadAutonoma = (req, res) => {
    var date = new Date();
    const { comunidadAutonoma, mes } = req.params;
    
    const tourists = Tourists.filter( t => t.MetaData.map(item => item.Id).includes(16420) && t.MetaData.map(item => item.Id).includes(291971)
        && t.MetaData.map(item => item.Nombre).includes(comunidadAutonoma))[0].Data.filter( d => d.Anyo == (date.getFullYear() - 1).toString() && d.T3_Periodo === mes)[0].Valor;
    
    /*var filterByTourists = function(tourist) { return tourist.MetaData[0].Nombre == "Turistas" };
    var filterByComunidadAutonoma = function(tourist) { return tourist.MetaData[3].Nombre == comunidadAutonoma };
    var filterByTotal = function(tourist) { return tourist.MetaData[1].Nombre == "Total" };
    var filterByFecha = function(month) { return month.T3_Periodo == mes && month.Anyo == (date.getFullYear() - 1) };
    
    const tourists = Tourists.filter(filterByTourists).filter(filterByComunidadAutonoma).filter(filterByTotal)[0]
                        .Data.filter(filterByFecha);*/

    res.json(tourists);
}



exports.findTripDuration = (req, res) => {
    const { origen, comunidadAutonoma, mes } = req.params;
    var date = new Date();

    var filterByDuration = function(tourist) { return tourist.MetaData[0].Nombre == "Duración media de los viajes" };
    var filterByComunidadAutonoma = function(tourist) { return tourist.MetaData[3].Nombre == comunidadAutonoma };
    var filterByOrigen = function(tourist) { return tourist.MetaData[1].Nombre == origen };
    var filterByFecha = function(month) { return month.T3_Periodo == mes && month.Anyo == (date.getFullYear() - 1) };

    const duration = Tourists.filter(filterByDuration).filter(filterByComunidadAutonoma).filter(filterByOrigen)[0]
                        .Data.filter(filterByFecha)[0].Valor;

    res.json(duration);
}

exports.findPeak = (req, res) => {
    const { comunidadAutonoma } = req.params;
    var date = new Date();

    var filterByTourists = function(tourist) { return tourist.MetaData[0].Nombre == "Turistas" };
    var filterByComunidadAutonoma = function(tourist) { return tourist.MetaData[3].Nombre == comunidadAutonoma };
    var filterByTotal = function(tourist) { return tourist.MetaData[1].Nombre == "Total" };
    var filterByFecha = function(month) { return month.Anyo == (date.getFullYear() - 1) };
    var sortByTourists = function(month1, month2) { return month2.Valor - month1.Valor };

    const months = Tourists.filter(filterByTourists).filter(filterByComunidadAutonoma).filter(filterByTotal)[0]
                        .Data.filter(filterByFecha).sort(sortByTourists);

    var peak = [{
        peak : "highest",
        month : months[0].T3_Periodo,
        value : months[0].Valor
    }, {
        peak : "second highest",
        month : months[1].T3_Periodo,
        value : months[1].Valor
    }, {
        peak : "lowest",
        month : months[11].T3_Periodo,
        value : months[11].Valor
    }, {
        peak : "second lowest",
        month : months[10].T3_Periodo,
        value : months[10].Valor
    }];

    res.json(peak);

}