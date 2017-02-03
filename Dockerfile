FROM microsoft/aspnetcore-build
 WORKDIR /blindating
 EXPOSE 5000 5001	
 COPY . .
 RUN dotnet restore
 WORKDIR /blindating/src/Blindating
 CMD /blindating/services.sh && /bin/bash
