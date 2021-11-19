/**
 * Returns an array of error field names using object dot notation for
 * array fields (if any)
 * Example:
 * Input: { name: 'is invalid', items: [{ description: 'is invalid' }] }
 * Output: ['name', 'items.0.description']
 * @param {Object} errors A Formik form errors
 * @returns {Array}
 */
export const getFieldErrorNames = (formikErrors) => {
  const transformObjectToDotNotation = (obj, prefix = '', result = []) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (!value) return

      const nextKey = prefix ? `${prefix}.${key}` : key
      if (typeof value === 'object') {
        transformObjectToDotNotation(value, nextKey, result)
      } else {
        result.push(nextKey)
      }
    })

    return result
  }

  return transformObjectToDotNotation(formikErrors)
}
