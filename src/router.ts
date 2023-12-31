// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/bookings`
  | `/example`
  | `/login`
  | `/signup`
  | `/tours/:id`
  | `/tours/booking/:tour_id`
  | `/tours/edit/:id`
  | `/tours/new`

export type Params = {
  '/tours/:id': { id: string }
  '/tours/booking/:tour_id': { tour_id: string }
  '/tours/edit/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
