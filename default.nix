let pkgs = import <nixpkgs> {};
in pkgs.stdenv.mkDerivation {
  name = "dumboEnv";
  src = ./.;
  buildInputs = with pkgs;
  [ python python27Packages.sqlite3 nodejs sqlite postgresql ];
  DATABASE_URL="sqlite:///dumbo.db";
  DEBUG="true";
  shellHook = ''
    if [ ! -d venv ]; then
      virtualenv --python=python2.7 venv
    fi
    source venv/bin/activate
  '';
}
