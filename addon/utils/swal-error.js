/* global swal */
export default function(response) {

  if (response.errors && response.errors.length) {
    var messages = '';
    response.errors.forEach(function(error) {
      // console.log('swalError: ', error)
      if (error.detail) {
        messages += error.detail + '\n';
      } else {
        messages += error.title + '\n';
      }
    });
    swal('Ops!', messages, 'error');
  } else {
    swal('Ops!', 'Erro desconhecido', 'error');
  }
}
