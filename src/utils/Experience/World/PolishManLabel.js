import * as THREE from 'three'
import Label from './Label'

export default class PolishManLabel extends Label {
  constructor(mesh) {
    super(mesh)
    this.element = this.create()
  }
  create() {
    const point = document.createElement('div')
    point.className = 'point'

    const fragment = document.createDocumentFragment()

    const label = document.createElement('div')
    label.className = `label ${this.name}`

    const titleContainer = document.createElement('div')
    const title = document.createElement('p')
    const serialNumber = document.createElement('p')

    titleContainer.className = `content`
    title.className = `lo-res-12`
    serialNumber.className = `lo-res-12`

    title.innerHTML = `No`
    serialNumber.innerHTML = `${this.name}`

    titleContainer.appendChild(title)
    titleContainer.appendChild(serialNumber)

    label.appendChild(titleContainer)
    fragment.appendChild(label)
    point.appendChild(fragment)

    document.querySelector('#three-js-container').appendChild(point)

    return point
  }
}