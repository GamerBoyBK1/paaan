@if (!Auth::check())
<style>

html, body {
  background: #000 !important;
  margin: 0;
  padding: 0;
}

/* BACKGROUND */
.nebula-auth-wallpaper {
  position: fixed;
  inset: 0;
  background: @if($n_auth_background_image == "")
      var(--authA);
    @else
      url("{{ $n_auth_background_image }}") no-repeat center;
    @endif
  background-size: cover;
  z-index: 1;
}

.nebula-auth-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 0;
}

/* LOGIN CONTAINER - PURE BLADE */
form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--authB);
  padding: 35px;
  border-radius: var(--borderRadiusAuth);
  width: 30%;
  z-index: 5;
}

/* Responsive */
@media(max-width: 900px){
  form { width: 80%; }
}

/* INPUT */
form input {
  width: 100%;
  background: var(--authC);
  border: none;
  border-bottom: 4px solid var(--authD);
  color: #fff;
}

/* BUTTON */
form button {
  background: var(--authF);
  color: var(--authH);
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}

form button:hover {
  opacity: 0.9;
}

/* LINKS */
form a {
  color: var(--authG);
}

form a:hover {
  color: #fff;
}

</style>
@endif