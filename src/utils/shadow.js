export const shadow =(elevation=3) => {
    return {
        elevation: elevation,
        shadowOpacity: 0.0015 * elevation + 0.18,
        shadowRadius: 0.54 * elevation,
        shadowOffset: {
            height: 0.6 * elevation,
        }
    }
};
