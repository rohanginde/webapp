
function isValidDate(dateString) {
  // Check if the dateString is a valid date format
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  return regex.test(dateString) && !isNaN(Date.parse(dateString));
}

export function validateRequestBody(req, res, next) {
  const { name, points, num_of_attempts, deadline } = req.body;

  // Check data types
  if (
    typeof name === 'string' &&
    typeof points === 'number' &&
    Number.isInteger(num_of_attempts) &&
    typeof deadline === 'string' &&
    isValidDate(deadline)
  ) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid data types or date format in the request body' });
  }
}

