// GENERAL 

export function updateData(data) {
    return {
        type: "UPDATE_DATA",
        data
    }
}

export function updateDimensions(width, height) {
    return {
        type: "UPDATE_DIMENSIONS",
        width,
        height
    }
}

export function updateCurrentDatum(datum) {
    return {
        type: "UPDATE_CURRENT_DATUM",
        datum
    }
}

export function driveChartUpdate() {
    return {
        type: "DRIVE_CHART_UPDATE"
    }
}

export function generateChart(chartType) {
    return {
        type: "GENERATE_CHART",
        chartType
    }
}
