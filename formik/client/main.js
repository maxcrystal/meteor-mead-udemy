import React from 'react'
import ReactDom from 'react-dom'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import { Container, Button, FormGroup, Label, Input } from "reactstrap"


const App = props => {
  console.log(props);
  return (
    <Container>
      <Form>
        <FormGroup>
          {props.touched.email && props.errors.email && <p>{props.errors.email}</p>}
          <Field type="email" name="email" placeholder="Email"/>
        </FormGroup>
        <FormGroup>
          {props.touched.password && props.errors.password && <p>{props.errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" autoComplete="current-passsword"/>
        </FormGroup>
        <FormGroup check>
          <Label for="newsletter">
          <Field className="form-check-input" type="checkbox" id="newsletter" name="newsletter"
                 checked={props.values.newsletter}/>
            Join newsletter
          </Label>
        </FormGroup>
        <FormGroup>
          <Field component="select" name="plan">
            <option value={'free'}>Free</option>
            <option value={'premium'}>Premium</option>
          </Field>
        </FormGroup>
        <Button color="primary" type="submit" disabled={props.isSubmitting}>Submit</Button>
      </Form>
    </Container>
  )
};

const FormikApp = withFormik({
  mapPropsToValues(props) {
    return {
      email: props.email || '',
      password: props.password || '',
      newsletter: props.newsletter || true,
      plan: props.plan || 'premium',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(3, 'Password must be longer then 3 characters').required('Password is requires'),
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting}) {
      console.log(values);
      setTimeout(() => {
        if (values.email === 'hmi@ya.ru') {
          setErrors({email: 'That email is already taken'})
        } else {
          resetForm()
        }
        setSubmitting(false)
      }, 2000)
  }
})(App);


ReactDom.render(<FormikApp email={'hmi@ya.ru'}/>, document.getElementById('app'));
