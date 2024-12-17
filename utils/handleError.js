const handleError = (err, req, res) => {
    if (err.name === 'ValidationError') {
        // Handle validation errors
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ error: 'Validation Error', details: errors });
    } else if (err.code === 11000) {
        // Handle duplicate key errors (e.g., unique constraint violation)
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            error: 'Validation Error',
            details: [`${field} must be unique.`]
        });
    }
    // General server error
    return res.status(500).json({ error: 'Something went wrong' });
};

export default handleError;