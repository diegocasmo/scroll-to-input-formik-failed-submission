import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
}

const schema = Yup.object().shape({
  friends: Yup.array(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    })
  )
    .min(1)
    .required(),
})

const App = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ values, ...rest }) => (
        <Form>
          <FieldArray name="friends">
            {({ remove, push }) => (
              <div>
                {values.friends.map((_, index) => (
                  <div key={index}>
                    <div>
                      <label htmlFor={`friends.${index}.name`}>Name</label>
                      <Field
                        name={`friends.${index}.name`}
                        placeholder="Jane Doe"
                        type="text"
                      />
                      <ErrorMessage
                        name={`friends.${index}.name`}
                        component="div"
                      />
                    </div>
                    <div>
                      <label htmlFor={`friends.${index}.email`}>Email</label>
                      <Field
                        name={`friends.${index}.email`}
                        placeholder="jane@acme.com"
                        type="email"
                      />
                      <ErrorMessage
                        name={`friends.${index}.name`}
                        component="div"
                      />
                    </div>
                    <div>
                      {values.friends.length > 1 && (
                        <button type="button" onClick={() => remove(index)}>
                          X
                        </button>
                      )}
                    </div>
                    <br />
                    <hr />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
)

export default App
