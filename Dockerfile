FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS build

WORKDIR /src

ARG BUILD_CONFIGURATION=Release


COPY ["DivyeshPortfolio.csproj", "./"]

RUN dotnet restore "DivyeshPortfolio.csproj"

COPY . .


RUN dotnet publish "DivyeshPortfolio.csproj" \
    -c $BUILD_CONFIGURATION \
    -o /app/publish \
    --no-restore \
    /p:UseAppHost=false


FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy-chiseled AS final

WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT=Production

ENV ASPNETCORE_HTTP_PORTS=10000

EXPOSE 10000

COPY --from=build --chown=1654:1654 /app/publish .

USER 1654

ENTRYPOINT ["dotnet", "DivyeshPortfolio.dll"]
