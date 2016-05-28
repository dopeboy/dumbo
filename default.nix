let pkgs = import <nixpkgs> {};
in pkgs.stdenv.mkDerivation {
  name = "dumboEnv";
  src = ./.;
  buildInputs = with pkgs;
  [ python3 python3Packages.sqlite3 nodejs sqlite postgresql heroku scrot ];
  DATABASE_URL="sqlite:///dumbo.db";
  DEBUG="true";
  shellHook = ''
    if [ ! -d venv ]; then
      pyvenv venv
    fi
    source venv/bin/activate
  '';
}
