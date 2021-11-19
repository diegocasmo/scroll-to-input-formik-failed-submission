import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { getFieldErrorNames } from './helpers'

export const ScrollToFieldError = ({
  scrollBehavior = { behavior: 'smooth', block: 'center' },
}) => {
  const { submitCount, isValid, errors } = useFormikContext()

  useEffect(() => {
    if (isValid) return

    const fieldErrorNames = getFieldErrorNames(errors)
    if (fieldErrorNames.length <= 0) return

    const elements = document.getElementsByName(fieldErrorNames[0])
    if (elements.length <= 0) return

    // Scroll to first known error into view
    elements[0].scrollIntoView(scrollBehavior)

    // Formik doesn't (yet) provide a callback for a client-failed submission,
    // thus why this is implemented through a hook that listens to changes on
    // the submit count.
  }, [submitCount]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
